import { gql } from 'apollo-server';

export type UserType = {
  username: string,
  name: string,
  email: string,
};

const userType = gql`
  type User { 
    username: String,
    name: String,
    email: String,
  }
`;

export default userType;
