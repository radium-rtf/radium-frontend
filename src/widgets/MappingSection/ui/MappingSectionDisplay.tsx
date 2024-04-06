'use client';

import {
  CourseSectionFooter,
  CourseSectionHeader,
  MappingSectionResponseDto,
  useAnswerCourseMappingSectionMutation,
} from '@/entities/CourseSection';
import { Card, CardContent } from '@/shared';
import { FC, Fragment } from 'react';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { MappingDraggable } from './MappingDraggable';

interface MappingSectionDisplayProps {
  sectionData: MappingSectionResponseDto;
}

export const MappingSectionDisplay: FC<MappingSectionDisplayProps> = ({ sectionData }) => {
  // Default values
  const DEFAULT_STATE: answerSchemaType = {
    mapping: {
      answer: (sectionData.answers || sectionData.variants).map((val) => ({
        value: val,
      })),
    },
  };

  // Form setup
  const form = useForm<answerSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(answerSchema),
    defaultValues: DEFAULT_STATE,
  });

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, swap } = useFieldArray({
    control: control,
    name: 'mapping.answer',
  });

  const [answerMappingSection] = useAnswerCourseMappingSectionMutation();
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await answerMappingSection({
      id: sectionData.id,
      ...data,
      mapping: {
        ...data.mapping,
        answer: data.mapping.answer.map((val) => val.value),
      },
    });
    if ('data' in response) {
      if (response.data.verdict === 'WA') {
        setError('mapping.answer', { message: 'Неправильно!' });
      } else {
        setTimeout(() => reset(undefined, { keepValues: true }), 2000);
      }
    } else {
      setError('root', { message: 'Ошибка!' });
    }
  };

  // DND setup
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

  return (
    <FormProvider {...form}>
      <Card>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CourseSectionHeader />
          <CardContent>
            <MarkdownDisplay markdown={sectionData.content} />
          </CardContent>
          <CardContent>
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
                                <span className='text-foreground-default flex-grow rounded-[0.5rem] border border-white/5 px-4 py-2 text-[0.8125rem] leading-normal'>
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
          </CardContent>
          <CourseSectionFooter
            sectionData={sectionData}
            resetObject={DEFAULT_STATE}
            errorMessage={errors.root?.message || errors.mapping?.answer?.message}
          />
        </form>
      </Card>
    </FormProvider>
  );
};
