import { gql } from 'apollo-server';
import userTypes, { UserType } from './user/UserTypes';

export type QueryTypeDef = {
  query: {
    user: UserType
  },
};

const queryTypes = gql`
  type Query {
    me: User
  }
`;

const globalQuery = [
  userTypes,
  queryTypes,
];

export default globalQuery;
