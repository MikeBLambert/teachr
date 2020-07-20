import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../db';

const resolvers = {
  Query: {
    getUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        Users.findById(id, (err, user) => {
          if (err) reject(err);
          else resolve(user);
        });
      });
    },
    getUsers: (_, { input }, { user }) => {
      return new Promise((resolve, reject) => {
        if (!user) reject('Please sign in!');
        Users.find({ ...input }, (err, users) => {
          if (err) reject(err);
          else resolve(users);
        });
      });
    },
  },
  Mutation: {
    logIn: async (_, { input: { email, password } }) => {
      try {
        const [user] = await Users.find({ email });
        if (!user) return 'Email not found';

        const isGoodPassword = bcrypt.compareSync(password, user.password);

        if (!isGoodPassword) return 'Invalid password';
        const token = jwt.sign(JSON.stringify(user), process.env.APP_SECRET);
        return { user, token };
      } catch (error) {
        console.log(error);
        return error._message;
      }
    },
    signUp: async (_, { input: { userName, email, password } }, context) => {
      const newUser = new Users({
        userName,
        email,
        password: bcrypt.hashSync(password, 3),
      });
      newUser.id = newUser._id;
      try {
        const user = await newUser.save();

        const token = jwt.sign(JSON.stringify(user), process.env.APP_SECRET);
      } catch (error) {
        console.log(error);
        return error._message;
      }
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
