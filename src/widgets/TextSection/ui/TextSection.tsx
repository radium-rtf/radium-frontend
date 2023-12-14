'use client';
import { FC, useContext, useState } from 'react';
import { Button, Card, Icon } from '@/shared';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import {
  TextSectionResponseDto,
  useUpdateCourseTextSectionMutation,
} from '@/entities/CourseSection';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';

interface IProps {
  sectionData: TextSectionResponseDto;
}

export const TextSection: FC<IProps> = ({ sectionData }) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [markdown, setMarkdown] = useState(sectionData.content);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSection] = useUpdateCourseTextSectionMutation();

  return (
    <Card>
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
