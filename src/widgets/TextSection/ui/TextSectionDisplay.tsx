import { CSSProperties, FC } from 'react';
import { Card, CardHeader } from '@/shared';
import { TextSectionResponseDto } from '@/entities/CourseSection';
import { useSortable } from '@dnd-kit/sortable';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { CSS } from '@dnd-kit/utilities';

interface TextSectionDisplayProps {
  sectionData: TextSectionResponseDto;
}

export const TextSectionDisplay: FC<TextSectionDisplayProps> = ({
  sectionData,
}) => {
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
    <Card ref={setNodeRef} style={style}>
      <CardHeader className='pb-6'>
        <MarkdownDisplay markdown={sectionData.content} />
      </CardHeader>
    </Card>
  );
};
