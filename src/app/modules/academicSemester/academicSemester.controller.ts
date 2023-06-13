import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester is created successfully',
    //   data: result,
    // });
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // };

  // search filter
  // const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
  const filters = pick(req.query, academicSemesterFilterableFields);
  // pagination options
  const paginationOptions = pick(req.query, paginationFields);

  // console.log(paginationOptions);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrieved Successfully',
    data: result,
  });
});

// update semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Updated Successfully',
    data: result,
  });
});

// delete semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Deleted Successfully',
    data: result,
  });
});

export const AcademicSemesterContoller = {
  createSemester,
  getSingleSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
};
