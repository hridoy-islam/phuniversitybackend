import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';
import { BloodGroup, Gender } from '../Faculty/faculty.constants';

const userNameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: 'Gender should be either Male or Female',
      },
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email address is required'],
    },
    contactNo: { type: String, required: [true, 'Contact No. is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: `{VALUES} is not a valid Blood Group`,
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

adminSchema.virtual('fullname').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

adminSchema.pre('find', function(next){
  this.find({isDeleted: {$ne : true}})
  next()
})

adminSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})

adminSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next()
})


adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
