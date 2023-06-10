import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    next();
    res.status(200).json({
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
  }
);

export const AcademicSemesterContoller = {
  createSemester,
};
