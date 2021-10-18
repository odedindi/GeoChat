18.10
init of the project,


#### backend = Markus
#### frontend = Oded



after a bit of exploring and experimenting and as I know that your backend work is done using node and express frameworks, 
i have taken the liberty to create a super basic server using express and socket.io and to initiate a continues feed.

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
        general chat (like a forum's board) with all other available users in the relevant distance and a list of potential users to chat with more privately.
        map of potential users to chat with and their location on the map.
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
 
 #### side note
*I know i said we gonna use Next and Ionic can be used with Next but a downside with Next is that the app must be able to run purely client-side 
and use Next.js's Export command, which means no SSR in Ionic codebase. There is likely a way to SSR and a fully static Next.js app
in tandem but it requires a Babel plugin or would involve a more elaborate setup with code sharing that is "out of our scope" right now.
Additionally, Next routing is not really used much in this app beyond a catch-all route to render the native app shell and engage the Ionic React Router, 
primarily because Next routing is not set up to enable native-style transitions and history state management like the kind Ionic uses.
