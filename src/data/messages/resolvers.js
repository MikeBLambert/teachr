import { Messages } from '../db';
import { PubSub } from 'graphql-subscriptions';
import { withFilter } from 'apollo-server';

const pubsub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const resolvers = {
  Query: {
    getOneMessage: (_, { id }) => {
      return new Promise((resolve, reject) => {
        Messages.findById(id, (err, message) => {
          if (err) reject(err);
          else resolve(message);
        });
      });
    },
    messages: async (_, { input: { userA, userB } }) => {
      try {
        return await Messages.findConversation({ userA, userB });
      } catch (error) {
        console.log(error);
      }
    },
    conversations: async (_, { id }) => {
      try {
        return await Messages.findConversations({ id });
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  Mutation: {
    createMessage: (_, { input: { sentBy, sentTo, text } }) => {
      const newMessage = new Messages({
        sentBy,
        sentTo,
        text,
        timestamp: Date.now(),
      });
      return new Promise((resolve, reject) => {
        newMessage.save((err) => {
          if (err) reject(err);
          else {
            console.log('Message saved!');
            pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage });
            resolve(newMessage);
          }
        });
      });
    },
    updateOneMessage: (_, { input: { id, text } }) => {
      return new Promise((resolve) => {
        Messages.findOneAndUpdate(
          { _id: id },
          { text },
          { new: true },
          (err, message) => {
            if (err) reject(err);
            else resolve(message);
          },
        );
      });
    },
    deleteOneMessage: (_, { id }) => {
      return new Promise((resolve, reject) => {
        Messages.remove({ _id: id }, (err) => {
          if (err) reject(err);
          else resolve(`Successfully deleted message ${id}`);
        });
      });
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED),
        (payload, variables) => {
          console.log({ payload, variables });
          return true;
        },
      ),
    },
  },
};

export default resolvers;
