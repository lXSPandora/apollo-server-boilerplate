// @flow
import UserModel from './UserModel';

const userResolvers = {
  me: () => ({
    _id: '12312423412341',
    name: 'Luiz Fernando Sousa Camargo',
    email: 'luizepauloxd@gmail.com',
    active: true,
  }),
  users: () => UserModel.find({}),
};

export default userResolvers;
