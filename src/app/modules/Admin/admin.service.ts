/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

export const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

export const updateAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  const { name, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, val] of Object.entries(name)) {
      modifiedData[`name.${key}`] = val;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
      if(!deletedAdmin){
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin')
      }

    const userid = deletedAdmin.user;

    const deletedUser = await User.findByIdAndUpdate(userid, {isDeleted: true}, {
        new: true,
        session
    })

    if(!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedAdmin;

  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
