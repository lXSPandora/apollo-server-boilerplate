// @flow
import userResolvers from './user/UserResolvers';

const globalResolvers = {
  Query: {
    me: userResolvers.me,
    users: userResolvers.users,
  },
  Mutation: {
    userAdd: userResolvers.userAdd,
  },
};

export default globalResolvers;
