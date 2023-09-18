import { PageResponseDto } from '@/entities/Page';
import {
  AnswerSection,
  ChoiceSection,
  MultiChoiceSection,
  ShortAnswerSection,
} from '@/entities/Section';
import { TextSection } from '@/entities/Section/ui/TextSection';
import { FC } from 'react';

interface IProps {
  page: PageResponseDto;
}

export const CoursePage: FC<IProps> = ({ page }) => {
  return (
    <main className='flex w-[45rem] flex-col gap-8'>
      <h2 className='mx-6 text-5xl font-bold text-accent-primary-200'>
        {page.name}
      </h2>
      {page.sections.map((section) => {
        switch (section.type) {
          case 'text':
            return <TextSection data={section} />;
          case 'choice':
            return <ChoiceSection data={section} />;
          case 'multiChoice':
            return <MultiChoiceSection data={section} />;
          case 'answer':
            return <AnswerSection data={section} />;
          case 'shortAnswer':
            return <ShortAnswerSection data={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
};
