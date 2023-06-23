import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // ).lean();

  const user = new User();

  const isUserExist = await user.isUserExist(id);

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

  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token

  return {};
};

export const AuthService = {
  loginUser,
};
