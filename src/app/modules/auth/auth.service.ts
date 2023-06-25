import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // ).lean();

  // // by using user instance
  // const user = new User();

  // // using the instance methid
  // const isUserExist = await user.isUserExist(id);

  // using statics
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // // match password
  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExist?.password
  // );

  // if (!isPasswordMatched) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'password does not match');
  // }

  // // using instance method
  // if (
  //   isUserExist.password &&
  //   !(await user.isPasswordMatched(password, isUserExist.password))
  // ) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  // }

  // using static
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  // const accessToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //   },
  //   config.jwt.secret as Secret,
  //   { expiresIn: config.jwt.expires_in }
  // );

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // console.log({ accessToken, refreshToken, needsPasswordChange });

  return { accessToken, refreshToken, needsPasswordChange };
};

export const AuthService = {
  loginUser,
};
