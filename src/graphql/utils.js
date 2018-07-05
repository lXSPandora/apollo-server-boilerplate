import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import type { UserType } from './user/UserTypes';

export const generateToken = (user: UserType): string => `JWT ${jwt.sign({ id: user.email }, jwtSecret)}`;
