// @flow
import { gql } from 'apollo-server';

export type PostType = {
  _id: string,
  title: string,
  description: string,
  user: string,
};

export type PostConnection = {
  count: number,
  posts: Array<PostType>,
};

const postType: string = gql`
  type Post {
    _id: String
    title: String
    description: String
    user: User
  }

  type PostConnection {
    count: Int
    posts: [Post]
  }
`;

export default postType;
