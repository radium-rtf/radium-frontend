'use client';
import { useEffect } from 'react';
import { CodeSection } from '@/widgets/CodeSection';
import { TextSection } from '@/widgets/TextSection';
import { ChoiceSection } from '@/widgets/ChoiceSection';
import { AnswerSection } from '@/widgets/AnswerSection';
import { MappingSection } from '@/widgets/MappingSection';
import { PageNavigation } from '@/widgets/PageNavigation';
import { useGetPageQuery } from '@/entities/CoursePage';
import { MultiChoiceSection } from '@/widgets/MultiChoiceSection';
import { ShortAnswerSection } from '@/widgets/ShortAnswerSection';
import { PermutationSection } from '@/widgets/PermutationsSection';

interface IProps {
  params: {
    pageId: string;
    courseId: string;
  };
}

export default function Page({ params }: IProps) {
  const { data: page } = useGetPageQuery(params.pageId);

  useEffect(() => {
    const previousPages = JSON.parse(
      localStorage.getItem('previousPages') || '{}'
    ) as { [courseId: string]: string };

    localStorage.setItem(
      'previousPages',
      JSON.stringify({ ...previousPages, [params.courseId]: params.pageId })
    );
  }, [params.courseId, params.pageId]);

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
              return <TextSection key={section.id} sectionData={section} />;
            case 'choice':
              return <ChoiceSection key={section.id} sectionData={section} />;
            case 'multiChoice':
              return (
                <MultiChoiceSection key={section.id} sectionData={section} />
              );
            case 'shortAnswer':
              return (
                <ShortAnswerSection key={section.id} sectionData={section} />
              );
            case 'answer':
              return <AnswerSection key={section.id} sectionData={section} />;
            case 'permutation':
              return (
                <PermutationSection key={section.id} sectionData={section} />
              );
            case 'mapping':
              return <MappingSection key={section.id} sectionData={section} />;
            case 'code':
              return <CodeSection key={section.id} sectionData={section} />;
            default:
              return null;
          }
        })}
        <PageNavigation
          next={page.next}
          previous={page.previous}
          progressPercent={(page.score / (page.maxScore || 1)) * 100}
        />
      </main>
    </>
  );
}
