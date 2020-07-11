import mongoose from 'mongoose';

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
export default schema;
