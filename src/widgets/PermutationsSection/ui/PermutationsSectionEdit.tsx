import { PermutationSectionResponseDto } from '@/entities/Section';
import { FC } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { updateSchemaType } from '../lib/updateSchema';
import { Button, Card, Icon, Input } from '@/shared';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { dragEndHandler } from '../lib/dragEndHandler';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DevTool } from '@hookform/devtools';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { PermutationsEditItem } from './PermutationsEditItem';
import { useUpdatePermutationsSectionMutation } from '../api/permuationsSectionApi';

interface PermutationsSectionEditProps {
  sectionData: PermutationSectionResponseDto;
  onSuccess: () => void;
}

export const PermutationsSectionEdit: FC<PermutationsSectionEditProps> = ({
  sectionData,
  onSuccess,
}) => {
  // Update hook
  const [updatePermutationsSection] = useUpdatePermutationsSectionMutation();

  // Form init
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { isValid },
  } = useForm<updateSchemaType>({
    defaultValues: {
      maxScore: sectionData.maxScore,
      maxAttempts: 0,
      permutation: {
        question: sectionData.content,
        answer: sectionData.variants
          .map((variant) => ({ value: variant }))
          .concat([{ value: '' }]),
      },
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: 'permutation.answer',
  });

  const onSubmitHandler: SubmitHandler<updateSchemaType> = (data) => {
    updatePermutationsSection({
      sectionId: sectionData.id,
      ...data,
      permutation: {
        question: data.permutation.question,
        answer: data.permutation.answer
          .map((answer) => answer.value)
          .filter((answer) => answer !== ''),
      },
    })
      .unwrap()
      .then(onSuccess);
  };

  //  DND
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Card asChild>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmitHandler)}
        // onReset={() =>
        //   setValue(
        //     'permutation.answer',
        //     sectionData.answers || sectionData.variants
        //   )
        // }
      >
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
        </div>
        <header className='flex flex-col gap-4 text-[0.8125rem] leading-normal'>
          <Controller
            name='permutation.question'
            control={control}
            render={({ field }) => (
              <MarkdownEditor
                markdown={sectionData.content}
                onChange={field.onChange}
              />
            )}
          />
        </header>
        <DndContext
          collisionDetection={rectIntersection}
          onDragEnd={(e) => {
            if (e.over?.data.current?.sortable.index !== fields.length - 1) {
              dragEndHandler(e, fields, move);
            }
          }}
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
          sensors={sensors}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            <main className='-mx-6 flex flex-col gap-4'>
              {fields.map((field, index) => (
                <PermutationsEditItem
                  key={field.id}
                  value={field}
                  disabled={index === fields.length - 1}
                  {...register(`permutation.answer.${index}.value`, {
                    onChange: (e) => {
                      // add if last input has text
                      if (
                        e.target.value !== '' &&
                        index === fields.length - 1
                      ) {
                        append({ value: '' }, { shouldFocus: false });
                      }
                      // remove if NOT last empty
                      if (
                        e.target.value === '' &&
                        index !== fields.length - 1
                      ) {
                        remove(index);
                        setFocus(
                          `permutation.answer.${
                            fields.length - 3 >= 0 ? fields.length - 3 : 0
                          }.value`
                        );
                      }
                    },
                  })}
                />
              ))}
            </main>
          </SortableContext>
        </DndContext>
        <footer className='flex items-center gap-4 place-self-end'>
          <Input
            {...register('maxAttempts', { valueAsNumber: true })}
            placeholder='Максимум'
          >
            <span className='font-sans text-[0.625rem]'>попыток</span>
          </Input>
          <Input
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
            className='w-64'
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
        <DevTool control={control} />
      </form>
    </Card>
  );
};
