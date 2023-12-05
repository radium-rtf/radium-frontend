import { Icon } from '@/shared';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/shared/api/uploadFile';
import { ChangeEvent, FC, useRef } from 'react';
import { changeBannerClickHandler } from '../lib/changeBannerClickHandler';
import { useUpdateCourseBannerMutation } from '@/entities/Course';

interface ChangeBannerProps {
  courseId: string;
}

export const AddBanner: FC<ChangeBannerProps> = ({ courseId }) => {
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
      <button
        type='button'
        className='flex h-full w-full items-center justify-center gap-4 rounded-lg outline-none -outline-offset-2 outline-transparent focus-visible:outline-white'
        onClick={() => changeBannerClickHandler(inputRef.current!)}
      >
        <Icon type='add' />
        <span>Добавить обложку</span>
      </button>
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
