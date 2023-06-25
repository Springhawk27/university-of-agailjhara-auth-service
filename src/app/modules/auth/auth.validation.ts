// import { z } from 'zod';

// const createUserZodSchema = z.object({
//   body: z.object({
//     role: z.string({
//       required_error: 'role is required',
//     }),
//     password: z.string().optional(),
//   }),
// });
// const updateUserZodSchema = z.object({
//   body: z.object({
//     role: z.string({
//       required_error: 'role is required',
//     }),
//     password: z.string().optional(),
//   }),
// });

// // await createUserZodSchema.parseAsync(req)

// export const UserValidation = {
//   createUserZodSchema,
//   updateUserZodSchema,
// };

import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
