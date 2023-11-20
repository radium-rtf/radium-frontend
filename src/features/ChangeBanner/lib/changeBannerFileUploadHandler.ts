import { dispatch } from '@/shared/api/store';
import { uploadFile } from '@/shared/api/uploadFile';
import { ChangeEvent } from 'react';
import { banner } from '../api/courseBannerApi';

export const changeBannerFileUploadHandler = async (
  event: ChangeEvent<HTMLInputElement>,
  courseId: string,
  refreshHandler: () => void
) => {
  const fd = new FormData();
  fd.append('file', event.currentTarget.files!.item(0)!);
  const response = await uploadFile(fd);
  if (typeof response === 'string') return;

  dispatch(
    banner.initiate({
      courseId,
      logo: response.location,
    })
    // eslint-ignore-next-line
  ).then(refreshHandler);
};
