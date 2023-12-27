'use client';
import { cn } from '@/shared';
import Image from 'next/image';
import { FC, useContext } from 'react';
import { AddBanner, ChangeBanner } from '@/features/ChangeBanner';
import { CourseEditContext } from '@/features/CourseEditContext';

interface CourseBannerProps {
  url: string;
  name: string;
  courseId: string;
  isEditAllowed: boolean;
}

export const CourseBanner: FC<CourseBannerProps> = ({ name, url, courseId, isEditAllowed }) => {
  const { isEditing } = useContext(CourseEditContext);
  return (
    <div
      className={cn(
        'bg-background-card relative mb-8 h-64 overflow-hidden rounded-2xl md:container md:mx-auto md:mb-16'
      )}
    >
      {url !== '' ? (
        <>
          <Image
            src={url}
            alt={name}
            width={1280}
            height={256}
            priority
            className='aspect-[2] h-full w-full object-cover object-center md:aspect-[3] md:rounded-lg lg:aspect-[4]'
          />
          {isEditAllowed && isEditing && <ChangeBanner courseId={courseId} />}
        </>
      ) : (
        isEditAllowed && isEditing && <AddBanner courseId={courseId} />
      )}
    </div>
  );
};
