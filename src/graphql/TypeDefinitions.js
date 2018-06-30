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
  type Query {
    me: User,
    users: [User],
  }
`;

const globalQuery = [
  userTypes,
  queryTypes,
];

export default globalQuery;
