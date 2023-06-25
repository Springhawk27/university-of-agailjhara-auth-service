import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';

// eslint-disable-next-line no-unused-vars
const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);

  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  // const { refreshToken, ...others } = result;

  // // set refresh token into cookie

  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User lohggedin successfully !',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
