import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constants';
import { IUser } from './user.interface';
import { UserService } from './user.service';

// const createUser: RequestHandler = async (req, res, next) => {
//   try {
//     const { user } = req.body;
//     const result = await UserService.createUser(user);
//     res.status(200).json({
//       success: true,
//       message: 'User created successfully',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//     // res.status(400).json({
//     //   // success: false,
//     //   // message: 'Failed to create userr',
//     //   error: err,
//     // })
//   }
// };

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await UserService.createUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  createUser,
  getAllUser,
};
