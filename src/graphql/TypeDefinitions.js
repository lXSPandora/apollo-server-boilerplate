// @flow
import { gql } from 'apollo-server';
import userTypes from './user/UserTypes';
import postTypes from './posts/PostTypes';
import type { UserType } from './user/UserTypes';

export type QueryTypeDef = {
  query: {
    user: UserType,
  },
};

export type Context = {
  user: UserType,
};

const queryTypes: string = gql`
  type Query {
    me: User
    users(search: String, first: Int!, after: Int): UserConnection
    user(id: ID!): User
    posts(search: String, first: Int!, after: Int): PostConnection
    post(id: ID!): Post
  }

  type Mutation {
    userAdd(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
    postAdd(title: String!, description: String!): Post
  }
`;

const globalQuery: Array<string> = [postTypes, userTypes, queryTypes];

export default globalQuery;
