import { ApolloServer } from 'apollo-server';
import _ from 'lodash';
import { userTypeDefs, userResolver } from './data/users';

import { messageTypeDefs, messageResolver } from './data/messages';

const server = new ApolloServer({
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
  typeDefs: [userTypeDefs, messageTypeDefs],
  resolvers: _.merge(userResolver, messageResolver),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
