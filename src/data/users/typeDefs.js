import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
  }

  type AuthResponse {
    token: String
    user: User
  }

  input SignUpInput {
    id: ID
    email: String!
    password: String!
  }

  input UserInput {
    id: ID
    email: String
    password: String
  }

  input LogInInput {
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers(input: UserInput): [User]
  }

  type Mutation {
    logIn(input: LogInInput): AuthResponse
    signUp(input: SignUpInput): AuthResponse
    deleteOneUser(id: ID!): String
    updateOneUser(input: UserInput): User
  }
`;

export default typeDefs;
