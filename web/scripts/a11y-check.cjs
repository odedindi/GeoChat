const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

async function run() {
  const dist = path.resolve(__dirname, '..', 'dist', 'index.html');
  if (!fs.existsSync(dist)) {
    console.error('dist/index.html not found, run `yarn build` first');
    process.exit(2);
  }
  const html = fs.readFileSync(dist, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  const { window } = dom;
  // expose globals for axe-core before requiring it
  global.window = window;
  global.document = window.document;
  global.Node = window.Node;
  global.HTMLElement = window.HTMLElement;
  // require axe-core after globals are set
  const axeCore = require('axe-core');
  // wait a moment for scripts to load
  await new Promise((r) => setTimeout(r, 1000));
  const results = await new Promise((resolve) => {
    axeCore.run(window.document, {}, (err, res) => {
      if (err) throw err;
      resolve(res);
    });
  });
  const res = results;
  console.log('Accessibility violations:', res.violations.length);
  if (res.violations.length > 0) {
    for (const v of res.violations) {
      console.log(`\n- ${v.id}: ${v.description}`);
      for (const node of v.nodes) {
        console.log('  Target:', node.target.join(', '));
        console.log('  HTML:', node.html);
      }
    }
    process.exit(1);
  }
  console.log('No accessibility violations found (axe-core).');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
