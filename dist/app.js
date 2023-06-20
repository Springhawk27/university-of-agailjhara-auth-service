'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
// import usersService from './app/modules/users/users.service'
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
);
const http_status_1 = __importDefault(require('http-status'));
// eslint-disable-next-line no-unused-vars
const routes_1 = __importDefault(require('./app/routes'));
const app = (0, express_1.default)();
// const port = 3000
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log(app.get('env'));
// Application Routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);
app.use('/api/v1/', routes_1.default);
app.get('/', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.send('Working Successfully!');
  })
);
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
app.use(globalErrorHandler_1.default);
// handle not found
app.use((req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
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
exports.default = app;
