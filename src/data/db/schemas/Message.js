import { Schema, Types, model } from 'mongoose';
import _ from 'lodash';
import { NAMESPACE as UserNamespace } from './User';

const schema = new Schema({
  timestamp: Date,
  sentBy: {
    type: Schema.Types.ObjectId,
    ref: UserNamespace,
  },
  sentTo: {
    type: Schema.Types.ObjectId,
    ref: UserNamespace,
  },
  text: String,
});

export const NAMESPACE = 'Message';

schema.statics.findConversations = async function ({ id, limit, offset }) {
  const objectId = Types.ObjectId(id);
  const conversations = await this.aggregate([
    {
      $match: {
        $or: [{ sentBy: objectId }, { sentTo: objectId }],
      },
    },
    {
      $group: {
        _id: { sentBy: '$sentBy', sentTo: '$sentTo' },
        timestamp: { $last: '$timestamp' },
        text: { $last: '$text' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id.sentBy',
        foreignField: '_id',
        as: 'sender',
      },
    },
    {
      $unwind: {
        path: '$sender',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id.sentTo',
        foreignField: '_id',
        as: 'recipient',
      },
    },
    {
      $unwind: {
        path: '$recipient',
      },
    },
  ]);
  return _.uniqBy(conversations, (doc) =>
    [doc._id.sentBy.valueOf(), doc._id.sentTo.valueOf()].sort().join(),
  );
};

schema.statics.findConversation = async function ({ userA, userB }) {
  const conversation = await this.find({
    $or: [
      {
        sentTo: Types.ObjectId(userA),
        sentBy: Types.ObjectId(userB),
      },
      {
        sentBy: Types.ObjectId(userA),
        sentTo: Types.ObjectId(userB),
      },
    ],
  });
  console.log(conversation);
  return conversation;
};

export default model(NAMESPACE, schema);
