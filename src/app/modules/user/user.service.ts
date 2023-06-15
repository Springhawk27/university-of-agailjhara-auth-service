import { SortOrder } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constants';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';
// eslint-disable-next-line no-unused-vars
import { generateFacultyId } from './user.utils';

// we will not use req,res in service. Controller will handle these things
const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  // const id = await generateUserId();

  /// generate student Id
  // eslint-disable-next-line no-unused-vars
  const academicSemester = {
    code: '01',
    year: '2028',
  };
  const id = await generateFacultyId();

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

// get all user
const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i', // case-insensitive
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UserService = {
  createUser,
  getAllUsers,
};
