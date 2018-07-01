// @flow
import UserModel from './UserModel';
import type { UserType } from './UserTypes';

type UserAdd = {
  email: string,
  name: string,
  password: string,
}

type FindOneUser = {
  id: string,
}

type ConnectionArgs = {
  search: string,
  after: string,
  first: number,
}

const userResolvers = {
  me: () => ({
    _id: '12312423412341',
    name: 'Luiz Fernando Sousa Camargo',
    email: 'luizepauloxd@gmail.com',
    active: true,
  }),
  users: (obj: UserType, args: ConnectionArgs) => {
    const { search, after, first } = args;

    const where = search
      ? {
        name: {
          $regex: new RegExp(`^${search}`, 'ig'),
        },
      }
      : {};

    const users = first === 10 ? UserModel.find(where).limit(first) : UserModel.find(where).skip(after).limit(first);

    console.log(users);

    return {
      count: UserModel.find().count(),
      users,
    };
  },
  user: async (obj: UserType, args: FindOneUser) => {
    const { id } = args;
    return UserModel.findOne({ _id: id });
  },
  userAdd: async (obj: UserType, args: UserAdd) => {
    const { email, name, password } = args;

    if (!email || !name || !password) {
      throw new Error('Please fill all the fields');
    }

    const checkEmail = UserModel.findOne({
      email,
    });

    if (!checkEmail) {
      throw new Error('This email is already registered!');
    }

    const user = new UserModel({
      name,
      email,
      password,
    });

    await user.save();

    const { _id } = user;

    return UserModel.findOne({ _id });
  },
};

export default userResolvers;
