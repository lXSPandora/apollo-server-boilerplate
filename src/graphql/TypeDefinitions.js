// @flow
import { gql } from 'apollo-server';
import userTypes from './user/UserTypes';
import type { UserType } from './user/UserTypes';

export type QueryTypeDef = {
  query: {
    user: UserType,
  },
};

export type Context = {
  user: UserType,
};

const queryTypes = gql`
  type Query {
    me: User
    users(search: String, first: Int, after: Int!): UserConnection
    user(id: ID!): User
  }

  type Mutation {
    userAdd(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
  }
`;

const globalQuery = [userTypes, queryTypes];

export default globalQuery;
