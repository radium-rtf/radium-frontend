'use client';
import { useContext, useEffect, useLayoutEffect } from 'react';
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
import { CourseEditContext } from '@/features/CourseEditContext';
import { CoursePageInfo } from '@/widgets/CoursePageInfo';
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
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

interface IProps {
  params: {
    pageId: string;
    courseId: string;
  };
}

export default function Page({ params }: IProps) {
  const { data: page } = useGetPageQuery(params.pageId);
  const { isEditing } = useContext(CourseEditContext);
  const [updateOrder] = useChangeCourseSectionOrderMutation();

  useEffect(() => {
    const previousPages = JSON.parse(
      localStorage.getItem('previousPages') || '{}'
    ) as {
      [courseId: string]:
        | {
            pageId: string;
            pageName: string;
          }
        | undefined;
    };

    page &&
      localStorage.setItem(
        'previousPages',
        JSON.stringify({
          ...previousPages,
          [params.courseId]: {
            pageId: params.pageId,
            pageName: page.name,
          },
        })
      );
  }, [params.courseId, params.pageId, page]);

  useLayoutEffect(() => {
    if (page) {
      window.document.title = page.name;
    }
  }, [page]);

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
        return <PermutationSection key={section.id} sectionData={section} />;
      case 'mapping':
        return <MappingSection key={section.id} sectionData={section} />;
      case 'code':
        return <CodeSection key={section.id} sectionData={section} />;
      default:
        return null;
    }
  };

  if (!page) return null;

  return (
    <>
      <main className='flex w-[45rem] flex-col gap-8'>
        <h2 className='mx-6 font-mono text-5xl font-bold leading-[normal] text-accent-primary-200'>
          {page.name}
        </h2>
        {isEditing && <CoursePageInfo page={page} />}
        <ul className='flex flex-col gap-8'>
          <DndContext
            sensors={sensors}
            onDragEnd={onDragEndHandler}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={page.sections}
              strategy={verticalListSortingStrategy}
            >
              {page.sections.map(sectionRender)}
            </SortableContext>
          </DndContext>
        </ul>
        {!isEditing && (
          <PageNavigation
            next={page.next}
            previous={page.previous}
            progressPercent={(page.score / (page.maxScore || 1)) * 100}
          />
        )}
      </main>
    </>
  );
}
