# Welcome to Remix Firebase Template!

This template is serving Remix from Firebase Hosting and Functions V2

- [Remix Docs](https://remix.run/docs)

## Usage 

```sh
npx create-remix@latest --template pilvia/remix-firebase-template
```

## Development

Start the Remix development asset server and the Firebase emulator by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

Deploy app for production on Firebase:

```sh
npm run deploy
```

## Firebase Functions

You can add other Firebase Functions like Firebase triggers by adding code to functions/src and modifying functions/src/index.ts accordingly.
