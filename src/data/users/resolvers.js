import { Users } from '../db';

const resolvers = {
  Query: {
    getOneUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        Users.findById(id, (err, user) => {
          if (err) reject(err);
          else resolve(user);
        });
      });
    },
    getUsers: (_, { input }) => {
      return new Promise((resolve, reject) => {
        Users.find({ ...input }, (err, users) => {
          if (err) reject(err);
          else resolve(users);
        });
      });
    },
  },
  Mutation: {
    createOneUser: (_, { input: { userName, email, password } }) => {
      const newUser = new Users({ userName, email, password });
      newUser.id = newUser._id;
      return new Promise((resolve, reject) => {
        newUser.save((err) => {
          if (err) reject(err);
          else {
            console.log('User saved!');
            resolve(newUser);
          }
        });
      });
    },
    deleteOneUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        Users.remove({ _id: id }, (err) => {
          if (err) reject(err);
          else resolve(`Successfully deleted user ${id}`);
        });
      });
    },
    updateOneUser: (_, { input }) => {
      return new Promise((resolve) => {
        Users.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (err, user) => {
            if (err) reject(err);
            else resolve(user);
          },
        );
      });
    },
  },
};

export default resolvers;
