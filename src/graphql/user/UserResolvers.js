// @flow
import UserModel from './UserModel';
import { generateToken } from '../utils';
import postResolvers from '../posts/PostResolvers';
import type { UserType, UserConnection, UserAuth } from './UserTypes';
import type { Context } from '../TypeDefinitions';

type UserAdd = {
  email: string,
  name: string,
  password: string,
};

type FindOneUser = {
  id: string,
};

type ConnectionArgs = {
  search: string,
  after: string,
  first: number,
};

type Login = {
  email: string,
  password: string,
};

const userResolvers: Object = {
  User: {
    posts: ({ _id }: UserType, args: ConnectionArgs) => postResolvers.userPosts(args, _id),
  },
  me: (obj: UserType, args: void, context: Context): UserType => context.user,
  users: (obj: UserType, args: ConnectionArgs): UserConnection => {
    const { search, after, first } = args;

    const where = search
      ? {
        name: {
          $regex: new RegExp(`^${search}`, 'ig'),
        },
      }
      : {};

    const users = !after
      ? UserModel.find(where).limit(first)
      : UserModel.find(where)
        .skip(after)
        .limit(first);

    return {
      count: UserModel.count(),
      users,
    };
  },
  user: async (obj: UserType, args: FindOneUser): Promise<?UserType> => {
    const { id } = args;

    const user: UserType = UserModel.findOne({ _id: id });

    return user;
  },

  login: async (obj: UserType, args: Login): Promise<?UserAuth> => {
    const { email, password } = args;

    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const correctPassword = user.authenticate(password);

    if (!correctPassword) {
      throw new Error('Invalid email or password');
    }

    return {
      token: generateToken(user),
    };
  },

  userAdd: async (obj: UserType, args: UserAdd): Promise<?UserAuth> => {
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

    return {
      token: generateToken(user),
    };
  },
};

export default userResolvers;
