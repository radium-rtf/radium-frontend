'use client';
import { Icon, cn } from '@/shared';
import { ButtonHTMLAttributes, ChangeEvent, FC, useRef, useState } from 'react';
import { useUpdateCourseBannerMutation } from '@/entities/Course';
import { useUploadFileMutation } from '@/entities/File/api/fileApi';

type ChangeBannerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  courseId: string;
  hideText?: boolean;
};

export const ChangeBanner: FC<ChangeBannerProps> = ({
  hideText = false,
  courseId,
  onClick,
  className,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const [updateBanner] = useUpdateCourseBannerMutation();
  const [uploadFile] = useUploadFileMutation();

  const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const fd = new FormData();
    fd.append('file', event.currentTarget.files!.item(0)!);
    const response = await uploadFile(fd);
    if (!('data' in response)) {
      setIsError(true);
      return;
    }
    const uploadResponse = await updateBanner({ courseId, banner: response.data.location });
    if (!('data' in uploadResponse)) {
      setIsError(true);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          inputRef.current?.click();
          onClick?.(e);
        }}
        type='button'
        className={cn(
          'relative flex shrink-0 grow-0 items-center justify-center overflow-hidden rounded-[0.5rem]',
          isError && 'ring ring-red-500',
          className
        )}
        {...props}
      >
        <input
          name='file'
          ref={inputRef}
          onChange={onChangeHandler}
          className='hidden'
          type='file'
          accept='image/*'
        />
        {!hideText && (
          <div className='flex -translate-y-4 items-center gap-4'>
            <Icon type='add' />
            <span className='leading-tight'>Загрузить обложку</span>
          </div>
        )}
      </button>
    </>
  );
};
