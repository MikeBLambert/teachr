import { Messages } from '../db';
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
    getMessages: (_, { input }) => {
      return new Promise((resolve, reject) => {
        Messages.find({ ...input }, (err, messages) => {
          if (err) reject(err);
          else resolve(messages);
        });
      });
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
};

export default resolvers;
