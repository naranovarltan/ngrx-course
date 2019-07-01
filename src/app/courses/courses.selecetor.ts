import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CourseState } from './courses.reducer';
import * as fromCoursesReducer from './courses.reducer';
import { Course } from './model/course';
import { CourseCategory } from '../model/course-category.enum';

export const selectCoursesState = createFeatureSelector<CourseState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
  selectCoursesState,
  coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCoursesReducer.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter(course => course.category === CourseCategory.BEGINNER)
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter(course => course.category === CourseCategory.ADVANCED)
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter(course => course.promo).length
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);
