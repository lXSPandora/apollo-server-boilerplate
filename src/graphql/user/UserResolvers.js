// @flow
import UserModel from './UserModel';
import type { UserType } from './UserTypes';

type UserAdd = {
  email: string,
  name: string,
  password: string,
}

const userResolvers = {
  me: () => ({
    _id: '12312423412341',
    name: 'Luiz Fernando Sousa Camargo',
    email: 'luizepauloxd@gmail.com',
    active: true,
  }),
  users: () => UserModel.find({}),
  userAdd: async (obj: UserType, args: UserAdd) => {
    const { email, name, password } = args;

    if (!email || !name || !password) {
      throw new Error('Please fill all the fields');
    }

    const user = new UserModel({
      name,
      email,
      password,
    });

    await user.save();

    const { _id } = user;

    return UserModel.find({ _id });
  },
};

export default userResolvers;
