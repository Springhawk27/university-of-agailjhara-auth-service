import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { academicSemeterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);

  if (academicSemeterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
