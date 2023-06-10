import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters/',
    route: AcademicSemesterRoutes,
  },
];

// Application Routes
// router.use('/users/', UserRoutes);
// router.use('/academic-semesters/', AcademicSemesterRoutes);

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
