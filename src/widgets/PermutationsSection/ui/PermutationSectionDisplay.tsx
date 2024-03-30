'use client';

import { FC } from 'react';
import { Card, CardContent } from '@/shared';
import {
  CourseSectionFooter,
  CourseSectionHeader,
  PermutationSectionResponseDto,
  useAnswerCoursePermutationsSectionMutation,
} from '@/entities/CourseSection';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { dragEndHandler } from '../model/dragEndHandler';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { PermutationItem } from './PermutationItem';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { zodResolver } from '@hookform/resolvers/zod';

interface PermutationSectionDisplayProps {
  sectionData: PermutationSectionResponseDto;
}

export const PermutationsSectionDisplay: FC<PermutationSectionDisplayProps> = ({ sectionData }) => {
  // Default values
  const DEFAULT_STATE: answerSchemaType = {
    permutation: {
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
    setValue,
    formState: { errors },
  } = form;

  const { fields, move } = useFieldArray({
    control: control,
    name: 'permutation.answer',
  });

  const [answerPermutationsSection] = useAnswerCoursePermutationsSectionMutation();
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await answerPermutationsSection({
      id: sectionData.id,
      ...data,
      permutation: {
        ...data.permutation,
        answer: data.permutation.answer.map((val) => val.value),
      },
    });
    if ('data' in response) {
      if (response.data.verdict === 'WA') {
        setError('permutation.answer', { message: 'Неправильно!' });
      } else {
        setTimeout(() => reset(undefined, { keepValues: true }), 2000);
      }
    } else {
      setError('root', { message: 'Ошибка!' });
    }
  };

  // DND setup
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
                    <SortableContext items={fields} strategy={verticalListSortingStrategy}>
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
          </CardContent>
          <CourseSectionFooter
            sectionData={sectionData}
            resetObject={DEFAULT_STATE}
            errorMessage={errors.root?.message || errors.permutation?.answer?.message}
            isQuestion
            onAnswer={({ Answers }) =>
              Answers &&
              setValue(
                'permutation.answer',
                Answers.map((value) => ({ value }))
              )
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
