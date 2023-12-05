'use client';
import { Button, Card, Icon, PermutationItem, cn } from '@/shared';
import { FC, useContext, useState } from 'react';
import { useAnswerPermutationsSectionMutation } from '../api/permuationsSectionApi';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  rectIntersection,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { DevTool } from '@hookform/devtools';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { answerSchemaType } from '../lib/answerSchema';
import { PermutationSectionResponseDto } from '@/entities/CourseSection';
import { dragEndHandler } from '../lib/dragEndHandler';
import { CourseEditContext } from '@/features/CourseEditContext';
import { useSession } from 'next-auth/react';
import { PermutationsSectionEdit } from './PermutationsSectionEdit';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';

interface IProps {
  sectionData: PermutationSectionResponseDto;
}

export const PermutationSection: FC<IProps> = ({ sectionData }) => {
  // Form init
  const { setValue, handleSubmit, control } = useForm<answerSchemaType>({
    values: {
      permutation: {
        answer: (sectionData.answers || sectionData.variants).map((val) => ({
          value: val,
        })),
      },
    },
  });

  const { fields, move } = useFieldArray({
    control: control,
    name: 'permutation.answer',
  });

  const onSubmitHandler: SubmitHandler<answerSchemaType> = (data) => {
    answerPermutationsSection({
      id: sectionData.id,
      permutation: {
        answer: data.permutation.answer.map((val) => val.value),
      },
    })
      .unwrap()
      .then((result) => setVerdict(result.verdict));
  };

  // DnD init
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Verdict init
  const [verdict, setVerdict] = useState<
    PermutationSectionResponseDto['verdict']
  >(sectionData.verdict);
  const [answerPermutationsSection, { isLoading, isError }] =
    useAnswerPermutationsSectionMutation();

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
      <PermutationsSectionEdit
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
        onReset={() =>
          setValue(
            'permutation.answer',
            (sectionData.answers || sectionData.variants).map((val) => ({
              value: val,
            }))
          )
        }
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
        <DndContext
          collisionDetection={rectIntersection}
          onDragEnd={(e) => dragEndHandler(e, fields, move)}
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
          sensors={sensors}
        >
          <Controller
            name='permutation.answer'
            control={control}
            render={() => {
              return (
                <SortableContext
                  items={fields}
                  strategy={verticalListSortingStrategy}
                >
                  <main className='-mx-6'>
                    {fields.map((field) => (
                      <PermutationItem key={field.id} value={field} />
                    ))}
                  </main>
                </SortableContext>
              );
            }}
          />
        </DndContext>
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
                  <span className='text-destructive-default'>
                    Не правильно!
                  </span>
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
