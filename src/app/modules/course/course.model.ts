import { Schema, model } from 'mongoose';
import { TCourse, TPreRquisiteCourse } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRquisiteCourse>({
    course: { type: Schema.Types.ObjectId},
    isDeleted: {type: Boolean, default: false}

})

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Title Is Required'],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: [true, 'prefix Is Required'],
    trim: true,
  },
  code : {
    type: Number,
    required: [true, 'Code Is Required'],
  },
  credits : {
    type: Number,
    required: [true, 'Credits Is Required'],
  },
  preRequisiteCourses: [preRequisiteCoursesSchema]
});

export const Course = model<TCourse>('Course', courseSchema)
