'use client';
import {
  MappingSectionResponseDto,
  useAnswerCourseMappingSectionMutation,
} from '@/entities/CourseSection';
import { Button, Card, Icon, cn } from '@/shared';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { FC, Fragment, useContext, useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { answerSchemaType } from '../lib/answerSchema';
import { DevTool } from '@hookform/devtools';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';
import { MappingDraggable } from './MappingDraggable';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { CourseEditContext } from '@/features/CourseEditContext';
import { useSession } from 'next-auth/react';
import { MappingSectionEdit } from './MappingSectionEdit';

interface MappingSectionProps {
  sectionData: MappingSectionResponseDto;
}

export const MappingSection: FC<MappingSectionProps> = ({ sectionData }) => {
  // Verdict
  const [verdict, setVerdict] = useState<MappingSectionResponseDto['verdict']>(
    sectionData.verdict
  );

  // Answer
  const [answerMappingSection, { isLoading, isError }] =
    useAnswerCourseMappingSectionMutation();

  // Form init
  const { control, handleSubmit } = useForm<answerSchemaType>({
    defaultValues: {
      mapping: {
        answer: (sectionData.answer || sectionData.variants).map((item) => ({
          value: item,
        })),
      },
    },
  });

  const { fields, swap } = useFieldArray({
    control: control,
    name: 'mapping.answer',
  });

  const onSubmitHandler: SubmitHandler<answerSchemaType> = (data) => {
    answerMappingSection({
      id: sectionData.id,
      mapping: {
        answer: data.mapping.answer.map((item) => item.value),
      },
    })
      .unwrap()
      .then((result) => setVerdict(result.verdict));
  };

  // DnD init
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const oldIndex = fields.findIndex((answer) => answer.id === active.id);
    const newIndex = fields.findIndex((answer) => answer.id === over?.id);
    swap(oldIndex, newIndex);
  };

  // Edit checks
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor ||
    session.data?.user.roles.isTeacher ||
    false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditAllowed && isEditMode && isEditing) {
    return (
      <MappingSectionEdit
        sectionData={sectionData}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card asChild>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          <MarkdownDisplay markdown={sectionData.content} />
        </header>
        <main>
          <DndContext
            onDragEnd={handleDragEnd}
            sensors={sensors}
            modifiers={[restrictToParentElement, restrictToVerticalAxis]}
            collisionDetection={closestCorners}
          >
            <SortableContext items={fields} strategy={rectSwappingStrategy}>
              <div className='grid grid-cols-2 gap-4'>
                <Controller
                  control={control}
                  name='mapping.answer'
                  render={() => {
                    return (
                      <>
                        {fields.map((field, index) => {
                          return (
                            <Fragment key={field.id}>
                              <span className='flex-grow rounded-lg border border-white/5 px-4 py-2 text-[0.8125rem] leading-normal text-foreground-default'>
                                {sectionData.keys[index]}
                              </span>
                              <MappingDraggable data={field} />
                            </Fragment>
                          );
                        })}
                      </>
                    );
                  }}
                />
              </div>
            </SortableContext>
          </DndContext>
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          {isEditAllowed && isEditMode && (
            <div className='flex items-center gap-4'>
              <CourseSectionDelete
                pageId={sectionData.pageId}
                sectionId={sectionData.id}
              />
              <Button
                className='w-64 shrink-0'
                color='outlined'
                onClick={() => setIsEditing(true)}
              >
                <Icon type='edit' className='text-inherit' />
                <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                  Редактировать
                </span>
              </Button>
            </div>
          )}
          {(!isEditAllowed || !isEditMode) && (
            <>
              <div className='flex flex-col gap-2 text-[0.8125rem]'>
                {verdict === 'OK' && (
                  <span className='text-secondary-default'>Верно!</span>
                )}
                {verdict === 'WA' && (
                  <span className='text-destructive-default'>Неправильно!</span>
                )}
              </div>
              {!isLoading && !isError && (
                <span
                  className={cn(
                    'text-[0.8125rem]',
                    verdict === 'OK' && 'text-secondary-default'
                  )}
                >
                  {verdict === 'OK' &&
                    `${sectionData.maxScore} / ${sectionData.maxScore}`}
                  {verdict === 'WA' && `${0} / ${sectionData.maxScore}`}
                  {verdict === '' && `${sectionData.maxScore}`}
                  <span> баллов</span>
                </span>
              )}
              <Button type='reset'>Сбросить</Button>
              <Button disabled={isLoading} type='submit' color='accent'>
                Ответить
              </Button>
            </>
          )}
        </footer>
        <DevTool control={control} />
      </form>
    </Card>
  );
};
