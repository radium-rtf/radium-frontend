import { dispatch } from '@/shared/api/store';
import { deleteCourse } from '../api/deleteCourseApi';

export const CourseDeleteHandler = async (
  courseId: string,
  refreshHandler: () => void
) => {
  dispatch(deleteCourse.initiate(courseId)).then(refreshHandler);
};
