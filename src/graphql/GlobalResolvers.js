// @flow
import userResolvers from './user/UserResolvers';

type ResolversType = {
  Query: Object,
  Mutation: Object,
};

const globalResolvers: ResolversType = {
  Query: {
    me: userResolvers.me,
    users: userResolvers.users,
    user: userResolvers.user,
  },
  Mutation: {
    userAdd: userResolvers.userAdd,
    login: userResolvers.login,
  },
};

export default globalResolvers;
