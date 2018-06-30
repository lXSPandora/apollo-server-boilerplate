// @flow
import { gql } from 'apollo-server';

export type UserType = {
  _id: string,
  name: string,
  email: string,
  active: boolean,
};

const userType = gql`
  type User {
    _id: String,
    name: String,
    email: String,
    active: Boolean,
  }

  type UserConnection {
    count: Int,
    users: [User],
  }
`;

export default userType;
