import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Course } from './model/course';

export enum CoursesActionsTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Courses Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',

  CourseSaved = '[Edit Course Dialog] Course Saved'
}

export class CourseRequested implements Action {
  readonly type = CoursesActionsTypes.CourseRequested;
  constructor(public payload: {courseId: number}) {
  }
}

export class CourseLoaded implements Action {
  readonly type = CoursesActionsTypes.CourseLoaded;
  constructor(public payload: {course: Course}) {
  }
}

export class AllCoursesRequested implements Action {
  readonly type = CoursesActionsTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
  readonly type = CoursesActionsTypes.AllCoursesLoaded;
  constructor(public payload: {courses: Course[]}) {
  }
}

export class CourseSaved implements Action {
  readonly type = CoursesActionsTypes.CourseSaved;
  constructor(public payload: {course: Update<Course>}) {
  }
}

export type CoursesAction =
  CourseRequested |
  CourseLoaded |
  AllCoursesRequested |
  AllCoursesLoaded |
  CourseSaved;
