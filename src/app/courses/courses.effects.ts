import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AllCoursesLoaded, AllCoursesRequested, CourseLoaded, CourseRequested, CoursesActionsTypes, CourseSaved } from './courses.actions';
import { CoursesService } from './services/courses.service';
import { Course } from './model/course';
import { CourseState } from './courses.reducer';
import { allCoursesLoaded } from './courses.selecetor';


@Injectable()
export class CoursesEffects {
  @Effect()
  private loadCourse$ = this.actions
    .pipe(
      ofType<CourseRequested>(CoursesActionsTypes.CourseRequested),
      mergeMap((action) => this.coursesService.findCourseById(action.payload.courseId)),
      map((course: Course) => new CourseLoaded({ course }))
    );

  @Effect()
  private loadAllCourses$ = this.actions
    .pipe(
      ofType<AllCoursesRequested>(CoursesActionsTypes.AllCoursesRequested),
      withLatestFrom(this.store$.pipe(select(allCoursesLoaded))),
      filter(([action, isAllCoursesLoaded]) => !isAllCoursesLoaded),
      mergeMap((action) => this.coursesService.findAllCourses()),
      map((courses: Course[]) => new AllCoursesLoaded({ courses }))
    );

  constructor(
    private actions: Actions,
    private coursesService: CoursesService,
    private store$: Store<CourseState>
  ) {
  }
}
