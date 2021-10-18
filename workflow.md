18.10
init of the project,

what are we going to build:
Geo Chat App:
Main features:
  1. Real-time bidirectional event-based communication: live chat with people in your vicinity (by choice of distance up to a certain distance) 
  2. GeoLocation: a map page for: 
    A. a place where the user can set his preferred distance or at least can have get the sense of where that distance is.
    B. see other users locations (with concent from those users)
  3. database to store different users data and previous chats

Pages:
  - home, 2 options:
      1. general chat (like a forum's board) with all other available users in the relevant distance and a list of potential users to chat with more privately.
      2. map of potential users to chat with and their location on the map.
  - private chat page
  - user profile page: see and edit personal data, app data, groups, chats etc.
  - settings page  
    
so after few hours of internet wandering I set the stack as:

backend: 
  - Express / Nest 
  - Socket.io

*to be honest I can not tell if Socket.io would be a good / bad choice when compared with different alternatives 
such as Pusher, SocketCluster, firebase or others, please pay attention here so we can decide on our direction.

frontend: 
  - Ionic-React app as we want it to be a chat app i think having it native is the way to go and I wanted to try this framework for a while.
  - React-Leaflet for mapping (awesome open source library i like for mapping) 
  - styled-components for styling 
 
 
    =======================================================================================================
 #### side and not imprtant note
*I know i said we gonna use Next and Ionic can be used with Next but a downside with Next is that the app must be able to run purely client-side 
and use Next.js's Export command, which means no SSR in Ionic codebase. There is likely a way to SSR and a fully static Next.js app
in tandem but it requires a Babel plugin or would involve a more elaborate setup with code sharing that is "out of our scope" right now.
Additionally, Next routing is not really used much in this app beyond a catch-all route to render the native app shell and engage the Ionic React Router, 
primarily because Next routing is not set up to enable native-style transitions and history state management like the kind Ionic uses.
    =======================================================================================================


#### backend = Markus
#### frontend = Oded



after a bit of exploring and experimenting and as I know that your backend work is done using node and express frameworks, 
I have taken the liberty to create a super basic server using express and socket.io and to initiate a continues feed.

probably you won't use it but here is the server
```
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const http = require("http");
const server = http.createServer(app);
const PORT = 8080;

const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
const STATIC_CHANNELS = [
  {
    id: "global_notifications",
    name: "Global Notifications",
    participants: 0,
    sockets: [],
  },
  { id: "global_chat", name: "Global Chat", participants: 0, sockets: [] },
];

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("connection", null);

  socket.on("channel-join", (id) => {
    console.log("channel-join", id);
    STATIC_CHANNELS.forEach((c) => {
      const index = c.sockets.indexOf(socket.id);
      if (c.id === id) {
        if (index === -1) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      } else {
        if (index !== -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });

    return id;
  });

  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    STATIC_CHANNELS.forEach((c) => {
      const index = c.sockets.indexOf(socket.id);
      if (index !== -1) {
        c.sockets.splice(index, 1);
        c.participants--;
        io.emit("channel", c);
      }
    });
  });
});

app.get("/getChannels", (req, res) => {
  res.json({
    channels: STATIC_CHANNELS,
  });
});

```

also I have created a basic app with couple of tabs and an ugly chat page cause i wanted to have a better feeling on how to implement real time communication using Ionic but the code is too dirty and have different aspects I experimented with so it will be better to just start from scratch 

let me know what are your thoughts and so we could start implementing it.
    =======================================================================================================
