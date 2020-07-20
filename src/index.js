require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import _ from 'lodash';
import { userTypeDefs, userResolver } from './data/users';
import { messageTypeDefs, messageResolver } from './data/messages';
import authenticate from './utils/auth';

const context = async ({ req }) => {
  const user = authenticate(req);
  return { user };
};

const server = new ApolloServer({
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      console.log({ connectionParams, webSocket });
    },
  },
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
  typeDefs: [userTypeDefs, messageTypeDefs],
  context,
  resolvers: _.merge(userResolver, messageResolver),
  engine: {
    reportSchema: true,
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`);
});
