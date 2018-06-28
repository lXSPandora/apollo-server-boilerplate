import { ApolloServer } from 'apollo-server';
import globalResolvers from './graphql/GlobalResolvers';
import globalQuery from './graphql/TypeDefinitions';

const server = new ApolloServer({
  resolvers: globalResolvers,
  typeDefs: globalQuery,
  tracing: true,
});

const graphqlPort = 3000;

server.listen(graphqlPort).then(({ url }) => {
  console.log(`🚀 Apollo server ready on ${url}`);
});
