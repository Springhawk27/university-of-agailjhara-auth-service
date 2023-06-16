import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
// import usersService from './app/modules/users/users.service'
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import httpStatus from 'http-status';
// eslint-disable-next-line no-unused-vars
import routes from './app/routes';
const app: Application = express();
// const port = 3000
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(app.get('env'));

// Application Routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);

app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!');
});

// unhandled rejection
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
// app.get('/', async (req: Request, res: Response) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'))
// })

// try another error - uncaught
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
// })

// synchronous in async function
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
// })

// testing
// eslint-disable-next-line no-unused-vars, no-undef, @typescript-eslint/no-unused-vars
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully!')
//   // throw new ApiError(400, 'Error Error Errror')
//   // next('Error Error Errror2')
//   throw new Error('Error Error Errror')
// })

// global error handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

/// testing
// eslint-disable-next-line no-unused-vars
// const academicSemester = {
//   code: '01',
//   year: '2025',
// };

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();

export default app;
