import { FC, useRef } from 'react';
import { Icon } from '@/shared';
import { changeBannerClickHandler } from '../lib/changeBannerClickHandler';
import { changeBannerFileUploadHandler } from '../lib/changeBannerFileUploadHandler';
import { useRouter } from 'next/navigation';

interface ChangeBannerProps {
  courseId: string;
}

export const AddBanner: FC<ChangeBannerProps> = ({ courseId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refresh } = useRouter();
  return (
    <>
      <button
        type='button'
        className='flex h-full w-full items-center justify-center gap-4 rounded-lg outline-none -outline-offset-2 outline-transparent focus-visible:outline-white'
        onClick={() => changeBannerClickHandler(inputRef.current!)}
      >
        <Icon type='add' />
        <span>Добавить обложку</span>
      </button>
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
