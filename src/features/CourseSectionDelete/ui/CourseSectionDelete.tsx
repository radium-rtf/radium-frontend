import { Button, Icon } from '@/shared';
import { useDeleteCourseSectionMutation } from '../api/deleteCourseSectionApi';
import { FC } from 'react';

interface CourseSectionDeleteProps {
  sectionId: string;
}

export const CourseSectionDelete: FC<CourseSectionDeleteProps> = ({
  sectionId,
}) => {
  const [deleteSection] = useDeleteCourseSectionMutation();

  return (
    <Button onClick={() => deleteSection(sectionId)}>
      <Icon type='delete' className='shrink-0' />
    </Button>
  );
};
