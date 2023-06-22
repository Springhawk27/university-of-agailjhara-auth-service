import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

// eslint-disable-next-line no-unused-vars
const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);

  // const { ...loginData } = req.body;
  // const result = await AuthService.loginUser(loginData);
  // const { refreshToken, ...others } = result;

  // // set refresh token into cookie

  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // sendResponse<ILoginUserResponse>(res, {
  //   statusCode: 200,
  //   success: true,
  //   message: 'User lohggedin successfully !',
  //   data: others,
  // });
});

export const AuthController = {
  loginUser,
};
