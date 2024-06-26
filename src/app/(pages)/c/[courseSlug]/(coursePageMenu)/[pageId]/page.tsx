'use client';
import { CodeSection } from '@/widgets/CodeSection';
import { TextSection } from '@/widgets/TextSection';
import { ChoiceSection } from '@/widgets/ChoiceSection';
import { AnswerSection } from '@/widgets/AnswerSection';
import { MappingSection } from '@/widgets/MappingSection';
import { PageNavigation } from '@/widgets/PageNavigation';
import { CoursePageInfo } from '@/widgets/CoursePageInfo';
import { useGetPageQuery } from '@/entities/CoursePage';
import { CourseEditContext } from '@/features/CourseEditContext';
import { ShortAnswerSection } from '@/widgets/ShortAnswerSection';
import { MultiChoiceSection } from '@/widgets/MultiChoiceSection';
import { PermutationsSection } from '@/widgets/PermutationsSection';
import { MediaSection } from '@/widgets/MediaSection';
import { FileSection } from '@/widgets/FileSection';
import { useContext } from 'react';
import {
  AllSectionsResponseDto,
  useChangeCourseSectionOrderMutation,
} from '@/entities/CourseSection';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Card, useUpdateTitle } from '@/shared';
import Image from 'next/image';
import { useLastCoursePage } from '@/entities/Course';

interface IProps {
  params: {
    pageId: string;
    courseSlug: string;
  };
}

export default function CoursePage({ params }: IProps) {
  const {
    data: page,
    isLoading,
    error,
  } = useGetPageQuery(params.pageId, {
    skip: !Number.isNaN(Number(params.pageId)) && Number(params.pageId) === 0,
  });
  const { isEditing } = useContext(CourseEditContext);
  const [updateOrder] = useChangeCourseSectionOrderMutation();

  useLastCoursePage(params.courseSlug, params.pageId, page, page?.name);

  useUpdateTitle(page?.name || '<без названия>');

  // DND Handlers
  const onDragEndHandler = (e: DragEndEvent) => {
    if (e.over && e.active.id !== e.over?.id) {
      updateOrder({
        order: e.over.data.current!.order,
        pageId: e.over.data.current!.pageId,
        sectionId: e.active.id as string,
      });
    }
  };

  // DND Sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sectionRender = (section: AllSectionsResponseDto) => {
    switch (section.type) {
      case 'text':
        return <TextSection key={section.id} sectionData={section} />;
      case 'choice':
        return <ChoiceSection key={section.id} sectionData={section} />;
      case 'multiChoice':
        return <MultiChoiceSection key={section.id} sectionData={section} />;
      case 'shortAnswer':
        return <ShortAnswerSection key={section.id} sectionData={section} />;
      case 'answer':
        return <AnswerSection key={section.id} sectionData={section} />;
      case 'permutation':
        return <PermutationsSection key={section.id} sectionData={section} />;
      case 'mapping':
        return <MappingSection key={section.id} sectionData={section} />;
      case 'code':
        return <CodeSection key={section.id} sectionData={section} />;
      case 'media':
        return <MediaSection key={section.id} sectionData={section} />;
      case 'file':
        return <FileSection key={section.id} sectionData={section} />;

      default:
        return null;
    }
  };

  return (
    <main className='flex w-[45rem] flex-col gap-8'>
      {/* Loading state */}
      {isLoading && (
        <>
          <div className='h-16 w-full animate-pulse rounded-lg bg-card' />
          <Card className='h-64 animate-pulse' />
          <Card className='h-64 animate-pulse' />
          <Card className='h-20 animate-pulse' />
        </>
      )}
      {/* Page state */}
      {page && (
        <>
          <h2 className='mx-6 font-NTSomic text-2xl font-bold leading-[normal] text-primary'>
            {page.name}
          </h2>
          {isEditing && <CoursePageInfo page={page} />}
          {!!page.sections.length && (
            <ul className='flex flex-col gap-8'>
              <DndContext
                sensors={sensors}
                onDragEnd={onDragEndHandler}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              >
                <SortableContext items={page.sections} strategy={verticalListSortingStrategy}>
                  {page.sections.map(sectionRender)}
                </SortableContext>
              </DndContext>
            </ul>
          )}
          {!isEditing && (
            <PageNavigation
              next={page.next}
              previous={page.previous}
              progressPercent={(page.score / (page.maxScore || 1)) * 100}
            />
          )}
        </>
      )}
      {/* Error state */}
      {error && (
        <div className='flex h-full flex-col items-center justify-center gap-4'>
          <Image src={'/error.svg'} width={224} height={224} alt='Not found error' />
          <h1 className='font-NTSomic text-[2rem] font-bold text-primary'>
            Такой страницы курса нет :(
          </h1>
          <p className='text-primary'>
            Возможно страница была удалена или вы перешли по неверной ссылке
          </p>
        </div>
      )}
    </main>
  );
}
