import mongoose from 'mongoose';
import { NAMESPACE as UserNamespace } from './User';

const schema = new mongoose.Schema({
  timestamp: Date,
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserNamespace,
  },
  sentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserNamespace,
  },
  text: String,
});

export const NAMESPACE = 'Message';
export default schema;
