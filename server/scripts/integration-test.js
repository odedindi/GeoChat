// Simple integration script: connects to server, joins, sends a message, verifies via Prisma.
const { io } = require('socket.io-client');
const { PrismaClient } = require('@prisma/client');

async function run() {
  const prisma = new PrismaClient();
  await prisma.$connect();
  const port = process.env.SERVER_PORT || 4000;
  const url = `http://localhost:${port}`;
  const socket = io(url, { transports: ['websocket'] });
  let finished = false;
  const TIMEOUT_MS = 30000;

  const fail = async (code, msg) => {
    if (finished) return;
    finished = true;
    console.error(msg);
    try {
      await prisma.$disconnect();
    } catch (e) {}
    try {
      socket.disconnect();
    } catch (e) {}
    process.exit(code);
  };

  const timer = setTimeout(() => fail(3, 'integration test timeout'), TIMEOUT_MS);
  const seen = new Set();

  const userID = `itest-${Date.now()}`;
  const username = `itest-${Date.now()}`;
  const payload = {
    user: {
      userID,
      username,
      avatar: 'it',
      socketID: '',
      room: 'geoChat',
      preferedDistance: 1,
      geolocation_lat: 0,
      geolocation_lng: 0,
      beSeenBeyondRange: false,
    },
  };

  socket.on('connect', () => {
    console.log('connected, joining');
    socket.emit('join', payload);
  });

  socket.on('raiseToast', (t) => console.log('raiseToast:', t));
  socket.on('disconnect', (r) => console.log('socket disconnect', r));

  socket.on('joined', async () => {
    console.log('joined, sending message');
    // wait briefly to allow the server's DB upsert to complete
    setTimeout(() => {
      socket.emit('messageFromUser', { content: 'integration test ' + Date.now(), coord: { lat: 0, lng: 0 }, mentions: [] });
    }, 300);
  });

  socket.on('message', async (m) => {
    if (!m || !m.content) return;
    if (seen.has(m.content)) return;
    seen.add(m.content);
    console.log('received message from server', m && m.content);
    clearTimeout(timer);
    try {
      const found = await prisma.message.findFirst({ where: { content: m.content } });
      if (!found) return await fail(2, 'message not found in DB');
      console.log('message found in DB:', found.messageID);
      // cleanup
      await prisma.message.deleteMany({ where: { content: m.content } });
      await prisma.user.deleteMany({ where: { username } });
    } catch (err) {
      return await fail(2, 'verification error: ' + (err && err.message));
    } finally {
      try {
        await prisma.$disconnect();
      } catch (e) {}
      try {
        socket.disconnect();
      } catch (e) {}
      if (!finished) {
        finished = true;
        process.exit(0);
      }
    }
  });

  socket.on('connect_error', (err) => {
    console.error('connect_error', err.message);
    process.exit(2);
  });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
