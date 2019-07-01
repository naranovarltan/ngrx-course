import { CoursesAction, CoursesActionsTypes } from './courses.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Course } from './model/course';

export interface CourseState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CourseState = adapter.getInitialState({
  allCoursesLoaded: false
});

adapter.getInitialState();

export function coursesReducer(state: CourseState = initialCoursesState, action: CoursesAction): CourseState {
  switch (action.type) {
    case CoursesActionsTypes.CourseLoaded:
      return adapter.addOne(action.payload.course, {...state, allCoursesLoaded: true});

    case CoursesActionsTypes.AllCoursesLoaded:
      return adapter.addAll(action.payload.courses, state);

    case CoursesActionsTypes.CourseSaved:
      return adapter.updateOne(action.payload.course, state);
    default:
        return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
