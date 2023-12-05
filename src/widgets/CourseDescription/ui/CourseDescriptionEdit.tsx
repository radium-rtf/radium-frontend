import { Button, Card, Icon } from '@/shared';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdateCourseDescriptionMutation } from '@/entities/Course';

interface CourseDescriptionEditProps {
  courseId: string;
  description: string;
  onSave: () => void;
}

export const CourseDescriptionEdit: FC<CourseDescriptionEditProps> = ({
  courseId,
  description,
  onSave,
}) => {
  const router = useRouter();
  const [editorState, setEditorState] = useState(description);
  const [updateDescription] = useUpdateCourseDescriptionMutation();

  const saveHandler = () => {
    updateDescription({ courseId, description: editorState })
      .unwrap()
      .then(() => router.refresh())
      .then(onSave);
  };

  return (
    <Card>
      <MarkdownEditor markdown={editorState} onChange={setEditorState} />
      <Button className='w-64 self-end' onClick={saveHandler}>
        <Icon type='edit' />
        <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Сохранить</span>
      </Button>
    </Card>
  );
};
