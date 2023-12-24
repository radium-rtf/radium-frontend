import { Button, Icon } from '@/shared';
import { useDeleteCourseSectionMutation } from '../api/deleteCourseSectionApi';
import { FC } from 'react';

interface CourseSectionDeleteProps {
  sectionId: string;
  pageId: string;
}

export const CourseSectionDelete: FC<CourseSectionDeleteProps> = ({
  sectionId,
  pageId,
}) => {
  const [deleteSection] = useDeleteCourseSectionMutation();

  return (
    <Button
      type='button'
      variant='outline'
      onClick={() => deleteSection({ sectionId, pageId })}
    >
      <Icon type='delete' className='shrink-0 text-inherit' />
    </Button>
  );
};
