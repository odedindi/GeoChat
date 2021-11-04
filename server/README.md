## Project's structure:

```
src
 |  index.ts        => entry point
 |  app.ts
 ├─ config
 |
 ├─ controllers
 |  ├─ index.ts      => entry point
 |  ├─ logger
 |  ├─ constants.ts
 |  └─ routes
 |
 ├─ repositories
 |  ├─ model
 |  |  ├─ interfaces.d.ts
 |  |  ├─ Message.ts
 |  |  ├─ Room.ts
 |  |  ├─ User.ts
 |  |  └─ index.ts  => entry point
 |  |
 |  ├─ seeds
 |  |  ├─ Room.ts
 |  |  ├─ User.ts
 |  |  └─ index.ts  => entry point
 |  └─ index.ts     => entry point
 |
 ├─ utils
 |  ├─ generators.ts
 |  └─ index.ts     => entry point
 └─ types.d.ts      => general types

```
