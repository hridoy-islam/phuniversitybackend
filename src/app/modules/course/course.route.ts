import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';

const router = express.Router();
router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);
router.get('/', courseControllers.getAllCourses);
router.get('/:id', courseControllers.getSingleCourse);
// router.patch('/:id', courseControllers.)
router.delete('/:id', courseControllers.deleteCourse);

export const CourseRoutes = router;
