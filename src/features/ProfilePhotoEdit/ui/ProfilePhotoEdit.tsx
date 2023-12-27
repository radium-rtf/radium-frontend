'use client';

import { cn, Icon } from '@/shared';
import Image from 'next/image';
import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  MouseEventHandler,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  initialPhotoURL: string;
}

export const ProfilePhotoEdit = forwardRef<HTMLInputElement, IProps>(
  ({ initialPhotoURL, onChange: outerChangeHandler, className, ...props }, ref) => {
    const [newPhoto, setNewPhoto] = useState<File | null>(null);
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const imageClickHandler: MouseEventHandler<HTMLDivElement> = () => {
      if (newPhoto) {
        innerRef.current!.value = '';
        setNewPhoto(null);
        return;
      }

      innerRef.current?.click();
    };

    const onPhotoChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      const file = e.target.files?.item(0);
      file && setNewPhoto(file);
    };

    const convertFileToPhoto = (photoFile: File) => URL.createObjectURL(photoFile);

    return (
      <picture
        className={cn(
          'relative aspect-square h-32 overflow-hidden rounded-full bg-gray-400',
          className
        )}
      >
        <input
          onChange={(e) => {
            onPhotoChangeHandler(e);
            outerChangeHandler?.(e);
          }}
          className='invisible'
          type='file'
          accept='image/*'
          ref={innerRef}
          {...props}
        />
        <Image
          src={
            (newPhoto && convertFileToPhoto(newPhoto)) || initialPhotoURL || '/defaultProfile.svg'
          }
          className='absolute inset-0 h-full w-full object-cover'
          alt='Profile image'
          width={128}
          height={128}
        ></Image>
        <div
          onClick={imageClickHandler}
          className='absolute inset-0 flex cursor-pointer items-center justify-center bg-gray-800/80 opacity-0 transition-opacity hover:opacity-100'
        >
          <Icon type={!newPhoto ? 'edit' : 'reset'} />
        </div>
      </picture>
    );
  }
);

ProfilePhotoEdit.displayName = 'ProfilePhotoEdit';
