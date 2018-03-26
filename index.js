const Hapi = require('hapi');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const { schema } = require('./graphql/graphql');
const mongoose = require('mongoose');
const config = require('./config.json');

const HOST = 'localhost';
const PORT = 3000;

async function StartServer() {
  const server = new Hapi.server({
    host: HOST,
    port: PORT
  });

  mongoose.connect(config.database);

  await server.register([
    {
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: {
          schema: schema
        },
        route: {
          cors: true
        }
      }
    },
    {
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql',
        },
      },
    }
  ]);



  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.log(`Error while starting serer:${err.message}`);
  }
}

StartServer();