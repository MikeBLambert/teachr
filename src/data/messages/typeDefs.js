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

  input CreateMessageInput {
    sentBy: ID!
    sentTo: ID!
    text: String!
  }

  input MessageInput {
    id: ID
    sentBy: ID
    sentTo: ID
    text: String
  }

  extend type Query {
    getOneMessage(id: ID): Message
    getMessages(input: MessageInput): [Message]
  }

  extend type Mutation {
    createMessage(input: CreateMessageInput): Message
    updateOneMessage(input: MessageInput): Message
    deleteOneMessage(id: ID): String
  }
`;

export default typeDefs;
