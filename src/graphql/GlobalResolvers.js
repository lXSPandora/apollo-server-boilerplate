// @flow
import userResolvers from './user/UserResolvers';

const globalResolvers = {
  Query: {
    me: userResolvers.me,
    users: userResolvers.users,
  },
};

export default globalResolvers;
