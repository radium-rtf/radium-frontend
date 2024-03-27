'use client';

import { MediaSectionResponseDto } from '@/entities/CourseSection';
import Image from 'next/image';

interface MediaSelection {
  sectionData: MediaSectionResponseDto;
}

export const MediaSelection = ({ sectionData }: MediaSelection) => {
  return (
    <>
      {sectionData.file.type.startsWith('image/') && (
        <Image
          src={sectionData.file.location}
          alt={sectionData.file.name}
          width={1920}
          height={1080}
          className='h-auto w-auto'
        />
      )}
      {sectionData.file.type.startsWith('video/') && (
        <video controls>
          <source src={sectionData.file.location} type={sectionData.file.type} />
        </video>
      )}
      {sectionData.file.type.startsWith('iframe') && (
        <iframe height={500} src={sectionData.file.location}></iframe>
      )}
    </>
  );
};
