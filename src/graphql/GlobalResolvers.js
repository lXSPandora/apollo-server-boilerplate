// @flow
import userResolvers from './user/UserResolvers';

const globalResolvers = {
  Query: {
    me: userResolvers.me,
  },
};

export default globalResolvers;
