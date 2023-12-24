import { useUpdateCourseLogoMutation } from '@/entities/Course';
import { useUploadFileMutation } from '@/entities/File/api/fileApi';
import { Icon, cn } from '@/shared';
import Image from 'next/image';
import { ChangeEvent, FC, useRef, useState } from 'react';

interface ChangeCourseLogoProps {
  logo: string;
  courseId: string;
}

export const ChangeCourseLogo: FC<ChangeCourseLogoProps> = ({
  logo,
  courseId,
}) => {
  const [updateLogo] = useUpdateCourseLogoMutation();
  const [uploadFile] = useUploadFileMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', e.target.files![0]);
    const response = await uploadFile(fd);
    if ('data' in response) {
      await updateLogo({ courseId, logo: response.data.location })
        .unwrap()
        .catch(() => setIsError(true));
    } else {
      setIsError(true);
    }
  };

  return (
    <button
      onClick={() => inputRef.current?.click()}
      type='button'
      className={cn(
        'relative block h-[4.5rem] w-[4.5rem] shrink-0 grow-0 overflow-hidden rounded-[0.5rem] bg-popover',
        isError && 'ring ring-red-500'
      )}
    >
      {logo && (
        <Image
          src={logo}
          height={72}
          width={72}
          alt='Logo'
          className='h-[4.5rem] w-[4.5rem] object-cover object-center'
        />
      )}
      <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-popover/50 hover:opacity-100'>
        <Icon className='text-inherit' type={logo ? 'edit' : 'add'} />
      </div>
      <input
        name='file'
        ref={inputRef}
        onChange={onChangeHandler}
        className='hidden'
        type='file'
        accept='image/*'
      />
    </button>
  );
};
