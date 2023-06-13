import express from 'express';
// import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterContoller } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterContoller.createSemester
);

router.get('/:id', AcademicSemesterContoller.getSingleSemester);
router.patch('/:id', AcademicSemesterContoller.updateSemester);

router.get('/', AcademicSemesterContoller.getAllSemesters);

export const AcademicSemesterRoutes = router;
