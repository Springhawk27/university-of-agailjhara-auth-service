import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

// we will not use req,res in service. Controller will handle these things
const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId();

  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);
  // if (!createUser) {
  //   throw new Error('Failed to create user')
  // }
  if (!createUser) {
    throw new ApiError(400, 'Failed to create user2');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};
