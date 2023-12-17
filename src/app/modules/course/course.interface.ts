import { Types } from "mongoose"

export type TCourse = {
    title: string,
    prefix: string,
    code: number,
    credits: number,
    preRequisiteCourses: []
}

export type TPreRquisiteCourse = {
    course: Types.ObjectId,
    isDeleted: boolean
}