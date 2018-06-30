// @flow
import { gql } from 'apollo-server';
import userTypes from './user/UserTypes';

import type { UserType } from './user/UserTypes';

export type QueryTypeDef = {
  query: {
    user: UserType
  },
};

const queryTypes = gql`
  type PageInfo {
    hasNextPage: Boolean!,
    hasPreviousPage: Boolean!,
    startCursor: String,
    endCursor: String,
  }

  type Query {
    me: User,
    users(search: String, first: Int, after: String, before: String, last: Int): UserConnection,
    user(id: ID!): User,
  }

  type Mutation {
    userAdd(name: String!, email: String!, password: String!): User,
  }
`;

const globalQuery = [
  userTypes,
  queryTypes,
];

export default globalQuery;
