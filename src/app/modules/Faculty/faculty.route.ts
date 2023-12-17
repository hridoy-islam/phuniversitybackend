import express from "express";
import { facultyControllers } from "./faculty.controller";

const router = express.Router();

router.get('/', facultyControllers.getAllFaculties)
router.get('/:facultyId', facultyControllers.getSingleFaculty)
router.patch('/:facultyId', facultyControllers.updateFaculty)
router.delete('/:facultyId', facultyControllers.deleteFaculty)


export const FacultyRoutes = router;