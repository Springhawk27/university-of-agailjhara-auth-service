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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiErrors_1 = __importDefault(require('../../../errors/ApiErrors'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const academicSemester_constant_1 = require('./academicSemester.constant');
const academicSemester_model_1 = require('./academicSemester.model');
const createSemester = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.create(
      payload
    );
    if (
      academicSemester_constant_1.academicSemeterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      throw new ApiErrors_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid Semester Code'
      );
    }
    return result;
  });
const getAllSemesters = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const { page = 1, limit = 10 } = paginationOptions;
    // const skip = (page - 1) * limit;
    // search and filter
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    // const academicSemesterSearchableFields = ['title', 'code', 'year'];
    const andConditions = [];
    // search
    if (searchTerm) {
      andConditions.push({
        $or: academicSemester_constant_1.academicSemesterSearchableFields.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i', // // case-insensitive
            },
          })
        ),
      });
    }
    // console.log(filters);
    // console.log(Object.keys(filtersData));
    // console.log(Object.entries(filtersData));
    // filter
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    // filter
    // if (Object.keys(filtersData).length) {
    //   $and: [
    //     {
    //       title: filtersData.title,
    //     },
    //     {
    //       code: filtersData.code,
    //     },
    //   ];
    // }
    // const andConditions = [
    //   {
    //     $or: [
    //       {
    //         title: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         code: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         year: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //     ],
    //   },
    // ];
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    // console.log('checking sortBy', sortBy);
    // console.log('checking sortOrder', sortOrder);
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicSemester_model_1.AcademicSemester.find(
      whereConditions
    )
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    // const total = await AcademicSemester.countDocuments();
    const total =
      yield academicSemester_model_1.AcademicSemester.countDocuments(
        whereConditions
      );
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleSemester = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findById(id);
    return result;
  });
const updateSemester = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      payload.title &&
      payload.code &&
      academicSemester_constant_1.academicSemeterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      throw new ApiErrors_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid Semester Code'
      );
    }
    const result =
      yield academicSemester_model_1.AcademicSemester.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        }
      );
    return result;
  });
// delete semester
const deleteSemester = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicSemester_model_1.AcademicSemester.findByIdAndDelete(id);
    return result;
  });
exports.AcademicSemesterService = {
  createSemester,
  getSingleSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
};
