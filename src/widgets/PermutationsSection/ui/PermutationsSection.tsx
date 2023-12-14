'use client';
import { Button, Card, Icon, PermutationItem, cn, getNoun } from '@/shared';
import { FC, useContext, useState } from 'react';
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
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { answerSchemaType } from '../model/answerSchema';
import { PermutationSectionResponseDto } from '@/entities/CourseSection';
import { dragEndHandler } from '../model/dragEndHandler';
import { CourseEditContext } from '@/features/CourseEditContext';
import { useSession } from 'next-auth/react';
import { PermutationsSectionEdit } from './PermutationsSectionEdit';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { useAnswerCoursePermutationsSectionMutation } from '@/entities/CourseSection/api/courseSectionApi';

interface IProps {
  sectionData: PermutationSectionResponseDto;
}

export const PermutationSection: FC<IProps> = ({ sectionData }) => {
  // Form init
  const {
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitting,
      isSubmitted,
      isValid,
    },
  } = useForm<answerSchemaType>({
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

  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    await answer({
      id: sectionData.id,
      permutation: {
        answer: data.permutation.answer.map((val) => val.value),
      },
    })
      .unwrap()
      .then((res) => {
        if (res.verdict === 'WA') {
          setError('permutation.answer', { message: 'Неправильно!' });
        }
      })
      .catch(() => setError('permutation.answer', { message: 'Ошибка!' }));
  };

  // DnD init
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [answer] = useAnswerCoursePermutationsSectionMutation();

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
              // clearErrors('permutation.answer');
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
                className='w-64'
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
              {!isSubmitting && (
                <>
                  <span className='text-[0.8125rem] text-text-primary'>
                    {sectionData.verdict === '' &&
                      `${sectionData.maxAttempts} ${getNoun(
                        sectionData.maxAttempts,
                        'попытка',
                        'попытки',
                        'попыток'
                      )}`}
                    {sectionData.verdict !== '' &&
                      `Осталось ${sectionData.attempts} ${getNoun(
                        sectionData.maxAttempts,
                        'попытка',
                        'попытки',
                        'попыток'
                      )}`}
                    {}
                  </span>
                  <span
                    className={cn(
                      'text-[0.8125rem]',
                      sectionData.verdict === 'OK' && 'text-secondary-default'
                    )}
                  >
                    {(sectionData.verdict === 'OK' &&
                      `${sectionData.maxScore} / ${sectionData.maxScore}`) ||
                      (sectionData.verdict === 'WA' &&
                        `${0} / ${sectionData.maxScore}`) ||
                      (sectionData.verdict === '' && `${sectionData.maxScore}`)}
                    <span> баллов</span>
                  </span>
                </>
              )}
              <Button
                type='reset'
                onClick={() =>
                  reset({
                    permutation: {
                      answer: (sectionData.answers || sectionData.variants).map(
                        (val) => ({
                          value: val,
                        })
                      ),
                    },
                  })
                }
              >
                <Icon type='reset' />
              </Button>
              <Button
                className='w-64'
                color={(!isValid && isSubmitted && 'destructive') || 'accent'}
                type='submit'
                disabled={(!isValid && !isSubmitted) || isSubmitting}
              >
                <Icon
                  type={
                    (isSubmitSuccessful && 'submit') ||
                    (isSubmitting && 'loading') ||
                    (!isValid && isSubmitted && 'alert') ||
                    'success'
                  }
                  className='shrink-0 text-inherit'
                />
                <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                  {(errors.permutation?.answer &&
                    !isValid &&
                    errors.permutation.answer.message) ||
                    'Ответить'}
                </span>
              </Button>
            </>
          )}
        </footer>
      </form>
    </Card>
  );
};
