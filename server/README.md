# Server

The server is built using Node.js, Express.js, and MongoDB. It uses MongoDB Atlas to create an index and search as fast as possible among thousands of words.

## Develop

To start the server you need to set two environment variables:
`VAJEHH_FIRST_DB_URL` and `VAJEHH_SECOND_DB_URL`.
Because of the Atlas search limit to only 3 collections, the server will use the first database for the Motaradef, Sereh and Teyfi collections and the second one for the Farhangestan, Ganjvar and Dehkhoda.
You should create your own database and use the `VAJEHH_FIRST_DB_URL` and `VAJEHH_SECOND_DB_URL` environment variables to point to it.

After setting the environment variables, run the following command in the server directory:

```bash
npm start
```

Or if you are developing run it with Nodemon:

```bash
npm run server-dev
```

## Deploy

Be sure to modify accepted origins in the `index.js` file.  
You can deploy the server to [Heroku](heroku.com), first create and account and setup Heroku CLI, then run the following command (**when you are in the `/` directory**):

```bash
git subtree push --prefix server heroku master
```

If you want to know about deploying a MERN stack, read [this article](https://dev.to/stlnick/how-to-deploy-a-full-stack-mern-app-with-heroku-netlify-ncb).
