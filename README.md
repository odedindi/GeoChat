<img src='https://github.com/odedindi/GeoChat/blob/main/client/public/assets/beacon.png' alt='Logo of the project' width='50px' height='50px' />

# Beacon GeoChat

A free, multiplatform messaging app prototype, lets you choose a range where you want to find chat buddies to communicate with all with just a Wi-Fi connection.

Beacon GeoChat is especially awesome among friends and family and random people who want to stay in touch.

## Screenshots

- Chat Page

  - <img src='https://raw.githubusercontent.com/odedindi/GeoChat/main/screenshots/chat.png' alt='Chat Page' width='350px' height='350px' />

- Map Page

  - <img src='https://raw.githubusercontent.com/odedindi/GeoChat/main/screenshots/map.png' alt='Map Page' width='350px' height='350px' />

- Settings Page

  - <img src='https://raw.githubusercontent.com/odedindi/GeoChat/main/screenshots/settings.png' alt='Settings Page' width='350px' height='350px' />

- Dark Mode

  - <img src='https://raw.githubusercontent.com/odedindi/GeoChat/main/screenshots/settingsDark.png' alt='Dark Mode' width='350px' height='350px' />

- Signup Page

  - <img src='https://raw.githubusercontent.com/odedindi/GeoChat/main/screenshots/signup.png' alt='Signup Page' width='350px' height='350px' />

- Login Page

  - <img src='https://raw.githubusercontent.com/odedindi/GeoChat/main/screenshots/login.png' alt='Login Paget' width='350px' height='350px' />

- Restore Password Page

  - <img src='https://raw.githubusercontent.com/odedindi/GeoChat/main/screenshots/restorePassword.png' alt='Restore Password Page' width='350px' height='350px' />

## Tech/framework used

- TypeScript

- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org)
- [POSTGIS](https://postgis.net)
- [Passport.js](http://www.passportjs.org)
- [Socket.IO](https://socket.io/)

- [React.js](https://reactjs.org)
- [Ionic](https://ionicframework.com/)
- [Leaflet](https://leafletjs.com)


## Installing / Getting started

Have Docker and Docker-compose installed.
Then from root:

```shell
docker-compose up
```

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

If you'd like to contribute, please fork the repository and use a feature
branch.
Pull requests are warmly welcome.

## Links

- Project homepage: https://github.com/odedindi/GeoChat
- Repository: git@github.com:odedindi/GeoChat.git
- Issue tracker: https://github.com/odedindi/GeoChat/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    odedindi@gmail.com directly instead of using issue tracker.
    I value the care and effort to improve the security and privacy of this project!

## Licensing

The code in this project is licensed under MIT [license](https://github.com/odedindi/GeoChat/blob/main/LICENSE).
