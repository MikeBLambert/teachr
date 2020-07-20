import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date

  type Message {
    id: ID
    sentBy: ID
    sentTo: ID
    text: String
    timestamp: Date
  }

  type Conversation {
    id: ID
    text: String
    timestamp: Date
    sender: User
    recipient: User
  }

  input CreateMessageInput {
    sentBy: ID!
    sentTo: ID!
    text: String!
  }

  input UpdateMessageInput {
    id: ID
    sentBy: ID
    sentTo: ID
    text: String
  }

  input MessagesInput {
    userA: ID
    userB: ID
  }

  extend type Query {
    getOneMessage(id: ID): Message
    messages(input: MessagesInput): [Message]
    conversations(id: ID!): [Conversation]
  }

  extend type Mutation {
    createMessage(input: CreateMessageInput): Message
    updateOneMessage(input: UpdateMessageInput): Message
    deleteOneMessage(id: ID): String
  }

  type Subscription {
    messageAdded: Message
  }
`;

export default typeDefs;
