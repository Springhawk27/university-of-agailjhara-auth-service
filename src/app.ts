import cors from 'cors';
import express, { Application, Request, Response } from 'express';
// import usersService from './app/modules/users/users.service'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from './app/modules/user/user.route';
import { loggerInfo } from './shared/logger';
const app: Application = express();
// const port = 3000
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

loggerInfo.info(app.get('env'));

// Application Routes
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);
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

export default app;
