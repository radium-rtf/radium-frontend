import { useRouter } from 'next/navigation';
import { uploadFile } from '@/shared/api/uploadFile';
import { Button, Icon } from '@/shared';
import { ChangeEvent, FC, useRef } from 'react';
import { changeBannerClickHandler } from '../lib/changeBannerClickHandler';
import { useUpdateCourseBannerMutation } from '@/entities/Course';

interface ChangeBannerProps {
  courseId: string;
}

export const ChangeBanner: FC<ChangeBannerProps> = ({ courseId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refresh } = useRouter();
  const [updateBanner] = useUpdateCourseBannerMutation();

  const onChangeFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const fd = new FormData();
    fd.append('file', event.currentTarget.files!.item(0)!);
    const response = await uploadFile(fd);
    if (typeof response === 'string') return;
    updateBanner({ courseId, banner: response.location })
      .unwrap()
      .then(refresh);
  };

  return (
    <>
      <Button
        className='absolute right-4 top-4 w-64'
        color='accent'
        onClick={() => changeBannerClickHandler(inputRef.current!)}
      >
        <Icon type='edit' className='text-inherit' />
        <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
          Сменить обложку
        </span>
      </Button>
      <input
        onChange={onChangeFileHandler}
        ref={inputRef}
        name='banner'
        type='file'
        accept='image/*'
        className='hidden'
      />
    </>
  );
};
