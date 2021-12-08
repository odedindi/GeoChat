![Logo of the project](https://github.com/odedindi/GeoChat/blob/main/client/public/assets/beacon.png)

# Beacon GeoChat

> A free, multiplatform messaging app prototype, that lets you choose a range where you want to find chat buddies to communicate with all with just a Wi-Fi connection.

Beacon GeoChat is especially awesome among friends and family and random people who want to stay in touch.

## Screenshots

- Chat
  ![Chat Page](https://github.com/odedindi/GeoChat/screenshots/chat.png)

- Map
  ![Map Page](https://github.com/odedindi/GeoChat/screenshots/map.png)

- Settings
  ![Settings Page](https://github.com/odedindi/GeoChat/screenshots/settings.png)

- Dark Mode
  ![Dark Mode Page](https://github.com/odedindi/GeoChat/screenshots/settingsDark.png)

- Signup
  ![Signup Page](https://github.com/odedindi/GeoChat/screenshots/signup.png)

- Login
  ![Login Page](https://github.com/odedindi/GeoChat/screenshots/login.png)

- Restore Password
  ![Restore Password Page](https://github.com/odedindi/GeoChat/screenshots/restorePassword.png)

## Tech/framework used

- TypeScript

<b>Server:</b>

- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org)
- [POSTGIS](https://postgis.net)
- [Passport.js](http://www.passportjs.org)
- [Socket.IO](https://socket.io/)

- <b>Client:</b>
-
- [React.js](https://reactjs.org)
- [Ionic](https://electron.atom.io)
- [Leaflet](https://leafletjs.com)
- [Socket.IO](https://socket.io/)

## Installing / Getting started

Have Docker and Docker-compose installed.
Then from root:

```shell
docker-compose up
```

### Initial Configuration

no Inital configuration needed

## Developing

A brief intro for developers in order to start developing the project further:

clone the project and install all needed dependencies

```shell
git clone git@github.com:odedindi/GeoChat.git
cd GeoChat/
yarn install

yarn dev
```

Now we started both server (localhost:4000) and client (localhost:8100)

## Features

What's all the bells and whistles this project can perform?

- A live chat use Socket.io, where a use can get mentioned and mention other users in his range of preferrence.
- A live map where a user can see where he\she got mentioned
- Modify user's settings where can upload a personal avatar or choose a random one, change range, privacy and personal preferrences

## Contributing

"If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome."

## Links

- Project homepage: https://github.com/odedindi/GeoChat
- Repository: git@github.com:odedindi/GeoChat.git
- Issue tracker: https://github.com/odedindi/GeoChat/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    odedindi@gmail.com directly instead of using issue tracker.
    I value the care and effort to improve the security and privacy of this project!

## Licensing

"The code in this project is licensed under MIT [license](https://github.com/odedindi/GeoChat/blob/main/LICENSE)."
