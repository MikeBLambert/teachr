import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

export const NAMESPACE = 'User';
const User = schema.plugin(mongooseUniqueValidator);

const generateUserModel = ({ user }) => ({
  getAllUsers: User.find({ ...user }),
});

// export default generateUserModel;

export default User;
