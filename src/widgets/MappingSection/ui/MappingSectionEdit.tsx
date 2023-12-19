'use client';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { Button, Card, Icon, Input, cn } from '@/shared';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { CSSProperties, FC, Fragment } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import {
  MappingSectionResponseDto,
  useUpdateCourseMappingSectionMutation,
} from '@/entities/CourseSection';
import { zodResolver } from '@hookform/resolvers/zod';
import { MappingEditDraggable } from './MappingEditDraggable';
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
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface MappingSectionEditProps {
  sectionData: MappingSectionResponseDto;
  onSuccess: () => void;
}

export const MappingSectionEdit: FC<MappingSectionEditProps> = ({
  sectionData,
  onSuccess,
}) => {
  // Answer
  const [updateMappingSection] = useUpdateCourseMappingSectionMutation();

  // Form init
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setFocus,
    formState: { isValid },
  } = useForm<updateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      maxScore: sectionData.maxScore,
      maxAttempts: sectionData.maxAttempts,
      mapping: {
        question: sectionData.content,
        keys: sectionData.keys
          .map((item) => ({ value: item }))
          .concat([{ value: '' }]),
        answer: (sectionData.answers || sectionData.variants)
          .map((item) => ({
            value: item,
          }))
          .concat([{ value: '' }]),
      },
    },
  });

  const {
    fields: keysFields,
    remove: keysRemove,
    append: keysAppend,
  } = useFieldArray({
    control: control,
    name: 'mapping.keys',
  });

  const {
    fields: answerFields,
    append: answerAppend,
    remove: answerRemove,
    swap,
  } = useFieldArray({
    control: control,
    name: 'mapping.answer',
  });

  const onSubmitHandler: SubmitHandler<updateSchemaType> = (data) => {
    updateMappingSection({
      sectionId: sectionData.id,
      mapping: {
        question: data.mapping.question,
        answer: data.mapping.answer.map((item) => item.value).toSpliced(-1, 1),
        keys: data.mapping.keys.map((item) => item.value).toSpliced(-1, 1),
      },
      maxAttempts: data.maxAttempts,
      maxScore: data.maxScore,
    })
      .unwrap()
      .then(onSuccess);
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
    const oldIndex = answerFields.findIndex(
      (answer) => answer.id === active.id
    );
    const newIndex = answerFields.findIndex((answer) => answer.id === over?.id);

    swap(oldIndex, newIndex);
  };

  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    transform,
    transition,
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

  return (
    <Card
      asChild
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
        <div className='relative flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
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
        </div>
        <header className='flex flex-col gap-4 text-[0.8125rem] leading-normal'>
          <Controller
            name='mapping.question'
            control={control}
            render={({ field }) => (
              <MarkdownEditor
                markdown={sectionData.content}
                onChange={field.onChange}
              />
            )}
          />
        </header>
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Ответ
          </span>
        </div>

        <DndContext
          onDragEnd={(e) => {
            if (
              e.over?.data.current?.sortable.index !==
              e.over?.data.current?.sortable.items.length - 1
            ) {
              handleDragEnd(e);
            }
          }}
          sensors={sensors}
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
          collisionDetection={closestCorners}
        >
          <SortableContext items={answerFields} strategy={rectSwappingStrategy}>
            <main className='grid grid-cols-2 gap-4'>
              {answerFields.map((field, index) => {
                return (
                  <Fragment key={field.id}>
                    <Input
                      {...register(`mapping.keys.${index}.value`, {
                        onChange: (e) => {
                          // Remove answer if key and answer is empty
                          if (
                            e.target.value === '' &&
                            getValues(`mapping.answer.${index}.value`) === '' &&
                            index !== keysFields.length - 1
                          ) {
                            answerRemove(index);
                            keysRemove(index);
                            setFocus(
                              `mapping.keys.${
                                keysFields.length - 3 >= 0
                                  ? keysFields.length - 3
                                  : 0
                              }.value`
                            );
                          }

                          // add new answer if key is not empty
                          if (
                            e.target.value !== '' &&
                            index === keysFields.length - 1
                          ) {
                            answerAppend({ value: '' }, { shouldFocus: false });
                            keysAppend({ value: '' }, { shouldFocus: false });
                          }
                        },
                      })}
                    />
                    <MappingEditDraggable
                      disabled={index === keysFields.length - 1}
                      data={answerFields[index]}
                      {...register(`mapping.answer.${index}.value`, {
                        onChange: (e) => {
                          // Remove answer if key and answer is empty
                          if (
                            e.target.value === '' &&
                            getValues(`mapping.keys.${index}.value`) === '' &&
                            index !== keysFields.length - 1
                          ) {
                            answerRemove(index);
                            keysRemove(index);
                            setFocus(
                              `mapping.keys.${
                                keysFields.length - 3 >= 0
                                  ? keysFields.length - 3
                                  : 0
                              }.value`
                            );
                          }

                          // add new answer if key is not empty
                          if (
                            e.target.value !== '' &&
                            index === keysFields.length - 1
                          ) {
                            answerAppend({ value: '' }, { shouldFocus: false });
                            keysAppend({ value: '' }, { shouldFocus: false });
                          }
                        },
                      })}
                    />
                  </Fragment>
                );
              })}
            </main>
          </SortableContext>
        </DndContext>

        <footer className='flex items-center gap-4 place-self-end'>
          <Input
            className='flex-shrink'
            {...register('maxAttempts', { valueAsNumber: true })}
            placeholder='Максимум'
          >
            <span className='font-sans text-[0.625rem]'>попыток</span>
          </Input>
          <Input
            className='flex-shrink'
            {...register('maxScore', { valueAsNumber: true })}
            placeholder='Максимум'
          >
            <span className='font-sans text-[0.625rem]'>баллов</span>
          </Input>
          <CourseSectionDelete
            sectionId={sectionData.id}
            pageId={sectionData.pageId}
          />
          <Button
            className='w-64 flex-shrink-0'
            color='outlined'
            type='submit'
            disabled={!isValid}
          >
            <Icon type='save' className='text-inherit' />
            <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
              Сохранить
            </span>
          </Button>
        </footer>
      </form>
    </Card>
  );
};
