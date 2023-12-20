import { Schema, model } from 'mongoose';
import { TCourse, TCourseFaculty, TPreRquisiteCourse } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRquisiteCourse>({
    course: { type: Schema.Types.ObjectId, ref: 'Course'},
    isDeleted: {type: Boolean, default: false}
}, {
  _id: false,
})

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [{
    type: Schema.Types.ObjectId,
    ref: 'Faculty'
  }]
})

export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultySchema)

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
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {type: Boolean, default: false}
}, {
  timestamps: true
});

export const Course = model<TCourse>('Course', courseSchema)
