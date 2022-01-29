# MongoDB, React Next.js, and Material UI Demo

A MongoDB, React Next.js, and Material UI project that shows basic Create, Retrieve, Update, and Delete (CRUD) operations.

## How to Use

Run an npm install or update

```
npm i
```

Before starting the project, do the following:

1. From the MongoDB Atlas dashboard locate the 'Connect' section which has information on the connection string for the application, using this string; edit the .env file to add the connection string of the MongoDB database

1. Again from the MongoDB Atlas dashboard, within the 'Network Access' section, whitelist the IP address(es) that need to connect to the database

1. Edit the /src/data/db.js file which is used to seed the MongoDB with data; making changes to this file will also add, update, or delete sites from the collection.

Start the Next.js React app by using

```
npm run dev
```

Then navigate to default Next.js url http://localhost:3000/

The homepage, using Material UI components, to simply list all the sites in the seed file. On every reload it determines if a site should be added, updated, or deleted. The lastChecked timestamp is the last time that the data was updated.

## Copyright and Ownership

All terms used are copyright to their original authors.

## Live Demo

Live demo hosted on Vercel [MongoDB, React Next.js, and Material UI Demo](http://mongodb-react-nextjs-mui-demo.vercel.app/) and [Swagger Endpoint Api Documentation](http://mongodb-react-nextjs-mui-demo.vercel.app/swagger)
