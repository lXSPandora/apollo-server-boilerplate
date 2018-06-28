import user from './Mock.json';

const userResolvers = {
  me: () => user,
};

export default userResolvers;
