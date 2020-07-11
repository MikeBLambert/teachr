import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID
    userName: String
    email: String
    password: String
  }

  input StrictUserInput {
    id: ID
    userName: String!
    email: String!
    password: String!
  }

  input UserInput {
    id: ID
    userName: String
    email: String
    password: String
  }

  type Query {
    getOneUser(id: ID!): User
    getUsers(input: UserInput): [User]
  }

  type Mutation {
    createOneUser(input: StrictUserInput): User
    deleteOneUser(id: ID!): String
    updateOneUser(input: UserInput): User
  }
`;

export default typeDefs;
