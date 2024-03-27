'use client';
import { MediaSectionResponseDto } from '@/entities/CourseSection';

import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC } from 'react';
import { Card, cn } from '@/shared';
import { CSS } from '@dnd-kit/utilities';
import { MediaSelection } from './MediaSelection';

interface MediaSectionDisplayProps {
  sectionData: MediaSectionResponseDto;
}

export const MediaSectionDisplay: FC<MediaSectionDisplayProps> = ({ sectionData }) => {
  const { setNodeRef, transform, transition } = useSortable({
    id: sectionData.id,
    data: {
      order: sectionData.order,
      pageId: sectionData.pageId,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  } as CSSProperties;

  return (
    <Card
      ref={setNodeRef}
      className={cn('flex shrink-0 flex-col space-y-1.5 overflow-hidden')}
      style={style}
    >
      <MediaSelection sectionData={sectionData} />
    </Card>
  );
};
