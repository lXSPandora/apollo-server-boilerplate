// @flow
import { gql } from 'apollo-server';

export type UserType = {
  _id: string,
  name: string,
  email: string,
  active: boolean,
};

export type UserConnection = {
  count: number,
  users: Array<UserType>,
};

export type UserAuth = {
  token: string,
};

const userType: string = gql`
  type User {
    _id: String
    name: String
    email: String
    active: Boolean
    posts(search: String, first: Int!, after: Int): PostConnection
  }
  type UserConnection {
    count: Int
    users: [User]
  }
  type UserAuth {
    token: String
  }
`;

export default userType;
