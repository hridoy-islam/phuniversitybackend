import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';


const createCourse = catchAsync(async(req, res)=> {
    const result = await CourseServices.createCourseIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
    })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrived Successfully',
    data: result,
  });
});

// const updateFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const { faculty } = req.body;
//   const result = await FacultyServices.updateFacultyIntoDB(facultyId, faculty);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty is updated Successfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res)=> {
    const {id} = req.params
    const result = await CourseServices.deleteCourseFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted Successfully',
        data: result,
      });

})

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse
};
