// @flow
import jwt from 'jsonwebtoken';
import UserModel from './user/UserModel';
import { jwtSecret } from '../config';

export const getUser = async (token: string) => {
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
