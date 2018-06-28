import { ApolloServer } from 'apollo-server';
import { connectDatabase } from './database';
import globalResolvers from './graphql/GlobalResolvers';
import globalQuery from './graphql/TypeDefinitions';

const database = connectDatabase();
console.log(`Connected to mongo 🍃 at ${database.host}:${database.port}/${database.name}`);

const server = new ApolloServer({
  globalResolvers,
  globalQuery,
  tracing: true,
});

const opts = {
  http: {
    port: process.env.PORT || 7000,
  },
};

server.listen(opts).then(({ url }) => {
  console.log(`🚀 Apollo server ready on ${url}`);
});
