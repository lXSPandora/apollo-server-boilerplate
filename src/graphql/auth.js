// @flow
import jwt from 'jsonwebtoken';
import UserModel from './user/UserModel';
import { jwtSecret } from '../config';
import type { UserType } from './user/UserTypes';

type GetUser = {
  user: ?UserType,
};

export const getUser = async (token: string): Promise<?GetUser> => {
  if (!token) {
    return {
      user: null,
    };
  }

  try {
    const decodedToken = jwt.verify(token.substring(4), jwtSecret);

    const user = await UserModel.findOne({ email: decodedToken.id });

    return {
      user,
    };
  } catch (err) {
    return {
      user: null,
    };
  }
};
