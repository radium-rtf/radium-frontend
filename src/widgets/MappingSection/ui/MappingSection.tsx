'use client';
import {
  MappingSectionResponseDto,
  useAnswerCourseMappingSectionMutation,
} from '@/entities/CourseSection';
import { Button, Card, Icon, cn, getNoun } from '@/shared';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { CSSProperties, FC, Fragment, useContext, useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { answerSchemaType } from '../model/answerSchema';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { answerSchema } from '../model/answerSchema';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface MappingSectionProps {
  sectionData: MappingSectionResponseDto;
}

export const MappingSection: FC<MappingSectionProps> = ({ sectionData }) => {
  // Answer
  const [answer] = useAnswerCourseMappingSectionMutation();

  // Form init
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitting,
      isSubmitted,
      isValid,
    },
  } = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    values: {
      mapping: {
        answer: (sectionData.answers || sectionData.variants).map((item) => ({
          value: item,
        })),
      },
    },
  });

  const { fields, swap } = useFieldArray({
    control: control,
    name: 'mapping.answer',
  });

  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    await answer({
      id: sectionData.id,
      mapping: {
        answer: data.mapping.answer.map((item) => item.value),
      },
    })
      .unwrap()
      .then((res) => {
        if (res.verdict === 'WA') {
          setError('mapping.answer', { message: 'Неправильно!' });
        }
      })
      .catch(() => setError('mapping.answer', { message: 'Ошибка!' }));
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

  const {
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    listeners,
    isDragging,
  } = useSortable({
    id: sectionData.id,
    data: {
      order: sectionData.order,
      pageId: sectionData.pageId,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  } as CSSProperties;

  if (isEditAllowed && isEditMode && isEditing) {
    return (
      <MappingSectionEdit
        sectionData={sectionData}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card
      asChild
      id={`section-${sectionData.id}`}
      ref={setNodeRef}
      style={style}
      className={cn(
        'border border-transparent transition-colors duration-300',
        isDragging
          ? 'z-10 border-white/10 bg-[#2A2E2E]'
          : '[&:has(.drag:hover)]:border-white/10 [&:has(.drag:hover)]:bg-[#363A3B]'
      )}
    >
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div
          className={cn(
            'flex items-center gap-4 text-primary-default',
            isEditAllowed && isEditMode && 'relative'
          )}
        >
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
          {isEditAllowed && isEditMode && (
            <button
              className='drag after:absolute after:-left-6 after:-right-6 after:-top-6 after:bottom-0 after:block after:rounded-t-2xl after:content-[""]'
              type='button'
              ref={setActivatorNodeRef}
              {...listeners}
            >
              <Icon
                type='handle-horizontal'
                className='absolute left-1/2 top-0'
              />
            </button>
          )}
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
                  {sectionData.maxAttempts > 0 && (
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
                          sectionData.attempts,
                          'попытка',
                          'попытки',
                          'попыток'
                        )}`}
                      {}
                    </span>
                  )}
                  {sectionData.maxScore > 0 && (
                    <span
                      className={cn(
                        'text-[0.8125rem]',
                        sectionData.verdict === 'OK' && 'text-secondary-default'
                      )}
                    >
                      {(sectionData.verdict === 'OK' &&
                        `${sectionData.score} / ${sectionData.maxScore}`) ||
                        (sectionData.verdict === 'WA' &&
                          `${0} / ${sectionData.maxScore}`) ||
                        (sectionData.verdict === '' &&
                          `${sectionData.maxScore}`)}
                      <span> баллов</span>
                    </span>
                  )}
                </>
              )}
              <Button
                type='reset'
                onClick={() =>
                  reset({
                    mapping: {
                      answer: (sectionData.answers || sectionData.variants).map(
                        (item) => ({
                          value: item,
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
                disabled={
                  (!isValid && !isSubmitted) ||
                  isSubmitting ||
                  (sectionData.attempts <= 0 && !!sectionData.maxAttempts)
                }
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
                  {(errors.mapping?.answer &&
                    !isValid &&
                    errors.mapping.answer.message) ||
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
