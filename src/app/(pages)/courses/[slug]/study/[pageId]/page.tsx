'use client';
import { usePageQuery } from '@/entities/Page';
import {
  AnswerSection,
  ChoiceSection,
  CodeSection,
  MultiChoiceSection,
  ShortAnswerSection,
  TextSection,
} from '@/entities/Section';
import { PermutationSection } from '@/entities/Section/ui/PermutationSection';

interface IProps {
  params: {
    pageId: string;
    slug: string;
  };
}

export default function Page({ params }: IProps) {
  const { data: page } = usePageQuery(params.pageId);

  if (!page) return null;

  window.document.title = `${page.name}`;

  return (
    <>
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
    </>
  );
}
