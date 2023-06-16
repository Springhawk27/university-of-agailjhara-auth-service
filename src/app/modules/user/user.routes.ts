import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

// router.get('/:id', AcademicDepartmentController.getSingleDepartment);

// router.patch(
//   '/:id',
//   validateRequest(
//     AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
//   ),
//   AcademicDepartmentController.updateDepartment
// );

// router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', UserController.getAllUser);

export const UserRoutes = router;
