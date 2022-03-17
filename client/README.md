# Client

## Intro

The front-end is built using Create React App, so it is a single-page application and can be easily deployed to any server.

## Develop

Just run `npm start` in the root directory, and you should be able to access the application at `http://localhost:3000`.

## Build

To build the client, run the following command when you are in the client directory:

```bash
npm run build
```

It is also possible to have gzipped files, which can be served by the server (but it is not recommended), first by running the following command install `Gzipper` globally:

```bash
npm i gzipper -g
```

Then run the following command:

```bash
npm run build-gzip
```

> Note that it will just create the gzipped files for styles and scripts, but not for the media.

## Deploy

There are several ways to deploy the client to a server and numerous services to choose from. In this case, the most smooth way of doing this is using [Surge](https://surge.sh).
After installing it and following the [instructions](https://surge.sh/help/getting-started-with-surge), you can deploy the client to a server by running the following command when you are in the client directory:

```bash
surge
```

As simple as that, give the `build` directory and domain. You will have the website ready in less than a minute!
