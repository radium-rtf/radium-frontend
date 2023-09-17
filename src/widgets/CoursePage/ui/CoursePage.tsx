import { PageResponseDto } from '@/entities/Page';
import { TextSection } from '@/entities/Section/ui/TextSection';
import { FC } from 'react';

interface IProps {
  page: PageResponseDto;
}

export const CoursePage: FC<IProps> = ({ page }) => {
  return (
    <main className='w-[45rem]'>
      <h2>{page.name}</h2>
      {page.sections.map((section) => {
        switch (section.type) {
          case 'text':
            return <TextSection data={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
};
