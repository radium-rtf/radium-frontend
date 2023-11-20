import { FC, useRef } from 'react';
import { Button, Icon } from '@/shared';
import { changeBannerClickHandler } from '../lib/changeBannerClickHandler';
import { changeBannerFileUploadHandler } from '../lib/changeBannerFileUploadHandler';
import { useRouter } from 'next/navigation';

interface ChangeBannerProps {
  courseId: string;
}

export const ChangeBanner: FC<ChangeBannerProps> = ({ courseId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refresh } = useRouter();
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
        onChange={(e) => changeBannerFileUploadHandler(e, courseId, refresh)}
        ref={inputRef}
        name='banner'
        type='file'
        accept='image/*'
        className='hidden'
      />
    </>
  );
};
