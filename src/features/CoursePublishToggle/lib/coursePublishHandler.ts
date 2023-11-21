import { dispatch } from '@/shared/api/store';
import { publish } from '../api/publishCourseApi';

export const coursePublishHandler = async (
  courseId: string,
  refreshHandler: () => void
) => {
  dispatch(
    publish.initiate(courseId)
    // eslint-ignore-next-line
  ).then(refreshHandler);
};
