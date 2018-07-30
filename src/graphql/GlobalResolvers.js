// @flow
import userResolvers from './user/UserResolvers';
import postResolvers from './posts/PostResolvers';

type ResolversType = {
  Query: Object,
  Mutation: Object,
};

const globalResolvers: ResolversType = {
  Query: {
    me: userResolvers.me,
    users: userResolvers.users,
    user: userResolvers.user,
    post: postResolvers.post,
    posts: postResolvers.posts,
  },
  Mutation: {
    userAdd: userResolvers.userAdd,
    login: userResolvers.login,
    postAdd: postResolvers.postAdd,
  },
  Post: postResolvers.Post,
  User: userResolvers.User,
};

export default globalResolvers;
