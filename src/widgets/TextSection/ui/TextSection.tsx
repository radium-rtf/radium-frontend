'use client';
import { CSSProperties, FC, useContext, useState } from 'react';
import { Button, Card, Icon, cn } from '@/shared';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import {
  TextSectionResponseDto,
  useUpdateCourseTextSectionMutation,
} from '@/entities/CourseSection';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IProps {
  sectionData: TextSectionResponseDto;
}

export const TextSection: FC<IProps> = ({ sectionData }) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [markdown, setMarkdown] = useState(sectionData.content);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSection] = useUpdateCourseTextSectionMutation();

  const {
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    listeners,
    isDragging,
  } = useSortable({
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
      id={`section-${sectionData.id}`}
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative border border-transparent transition-colors duration-300',
        isDragging
          ? 'z-10 border-white/10 bg-[#2A2E2E]'
          : '[&:has(.drag:hover)]:border-white/10 [&:has(.drag:hover)]:bg-[#363A3B]'
      )}
    >
      {isEditMode && (
        <button
          className='drag after:absolute after:left-0 after:right-0 after:top-0 after:block after:h-8 after:rounded-t-2xl after:content-[""]'
          type='button'
          ref={setActivatorNodeRef}
          {...listeners}
        >
          <Icon type='handle-horizontal' className='absolute left-1/2 top-4' />
        </button>
      )}
      {!isEditing && <MarkdownDisplay markdown={sectionData.content} />}
      {isEditing && (
        <MarkdownEditor markdown={markdown} onChange={setMarkdown} />
      )}
      {isEditMode && (
        <div className='flex items-center gap-4 self-end'>
          <CourseSectionDelete
            sectionId={sectionData.id}
            pageId={sectionData.pageId}
          />
          {!isEditing && (
            <Button
              color='outlined'
              className='w-64 self-end'
              onClick={() => setIsEditing(true)}
            >
              <Icon type='edit' className='shrink-0' />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                Редактировать
              </span>
            </Button>
          )}
          {isEditing && (
            <Button
              color='outlined'
              className='w-64 self-end'
              onClick={() =>
                updateSection({
                  sectionId: sectionData.id,
                  text: { content: markdown },
                })
                  .unwrap()
                  .then(() => setIsEditing(false))
              }
            >
              <Icon type='save' className='shrink-0' />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                Сохранить
              </span>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
