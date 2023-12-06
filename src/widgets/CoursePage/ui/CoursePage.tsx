import { PageResponseDto } from '@/entities/Page';
import {
  AnswerSection,
  ChoiceSection,
  CodeSection,
  MultiChoiceSection,
  ShortAnswerSection,
} from '@/entities/CourseSection';
import { PermutationSection } from '@/entities/Section/ui/PermutationSection';
import { TextSection } from '@/entities/Section/ui/TextSection';
import { FC } from 'react';

interface IProps {
  page: PageResponseDto;
}

export const CoursePage: FC<IProps> = ({ page }) => {
  return (
    <main className='flex w-[45rem] flex-col gap-8'>
      <h2 className='mx-6 font-mono text-5xl font-bold leading-[normal] text-accent-primary-200'>
        {page.name}
      </h2>
      {page.sections.map((section) => {
        switch (section.type) {
          case 'text':
            return <TextSection key={section.id} data={section} />;
          case 'choice':
            return <ChoiceSection key={section.id} data={section} />;
          case 'multiChoice':
            return <MultiChoiceSection key={section.id} data={section} />;
          case 'answer':
            return <AnswerSection key={section.id} data={section} />;
          case 'shortAnswer':
            return <ShortAnswerSection key={section.id} data={section} />;
          case 'permutation':
            return <PermutationSection key={section.id} data={section} />;
          case 'code':
            return <CodeSection key={section.id} data={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
};
