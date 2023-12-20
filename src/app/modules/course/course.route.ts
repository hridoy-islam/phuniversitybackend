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
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
);
router.delete('/:id', courseControllers.deleteCourse);

router.put(
  '/:id/assign-faculties',
  validateRequest(CourseValidation.assignCourseFaculties),
  courseControllers.assignFaculties,
);

router.delete(
  '/:id/remove-faculties',
  validateRequest(CourseValidation.assignCourseFaculties),
  courseControllers.removeFaculties
);

export const CourseRoutes = router;
