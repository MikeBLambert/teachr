import mongoose from 'mongoose';
import userSchema, { NAMESPACE as UserNamespace } from './schemas/User';
import messageSchema, {
  NAMESPACE as MessageNamespace,
} from './schemas/Message';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/teachr', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export { default as Messages } from './schemas/Message';
export const Users = mongoose.model(UserNamespace, userSchema);
// export const Messages = mongoose.model(MessageNamespace, messageSchema);
