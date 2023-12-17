import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrived Successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(facultyId, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated Successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res)=> {
    const {facultyId} = req.params
    const result = await FacultyServices.deleteFacultyFromDB(facultyId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is deleted Successfully',
        data: result,
      });

})

export const facultyControllers = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty
};
