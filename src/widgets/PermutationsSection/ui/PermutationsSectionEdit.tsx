import {
  PermutationSectionResponseDto,
  useUpdateCoursePermutationsSectionMutation,
} from '@/entities/CourseSection';
import { CSSProperties, FC } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { Button, Card, Icon, Input, cn } from '@/shared';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { dragEndHandler } from '../model/dragEndHandler';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { PermutationsEditItem } from './PermutationsEditItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PermutationsSectionEditProps {
  sectionData: PermutationSectionResponseDto;
  onSuccess: () => void;
}

export const PermutationsSectionEdit: FC<PermutationsSectionEditProps> = ({
  sectionData,
  onSuccess,
}) => {
  // Update hook
  const [updatePermutationsSection] = useUpdateCoursePermutationsSectionMutation();

  // Form init
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { isValid },
  } = useForm<updateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      maxScore: sectionData.maxScore,
      maxAttempts: 0,
      permutation: {
        question: sectionData.content,
        answer: sectionData.variants.map((variant) => ({ value: variant })).concat([{ value: '' }]),
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

  const { setNodeRef, setActivatorNodeRef, listeners, transform, transition, isDragging } =
    useSortable({
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
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='text-primary-default relative flex items-center gap-4'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>Вопрос</span>
          <button
            className='drag after:absolute after:-left-6 after:-right-6 after:-top-6 after:bottom-0 after:block after:rounded-t-2xl after:content-[""]'
            type='button'
            ref={setActivatorNodeRef}
            {...listeners}
          >
            <Icon type='handle-horizontal' className='absolute left-1/2 top-0' />
          </button>
        </div>
        <header className='flex flex-col gap-4 text-[0.8125rem] leading-normal'>
          <Controller
            name='permutation.question'
            control={control}
            render={({ field }) => (
              <MarkdownEditor markdown={sectionData.content} onChange={field.onChange} />
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
          <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            <main className='-mx-6 flex flex-col gap-4'>
              {fields.map((field, index) => (
                <PermutationsEditItem
                  key={field.id}
                  value={field}
                  disabled={index === fields.length - 1}
                  {...register(`permutation.answer.${index}.value`, {
                    onChange: (e) => {
                      // add if last input has text
                      if (e.target.value !== '' && index === fields.length - 1) {
                        append({ value: '' }, { shouldFocus: false });
                      }
                      // remove if NOT last empty
                      if (e.target.value === '' && index !== fields.length - 1) {
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
          <Input {...register('maxAttempts', { valueAsNumber: true })} placeholder='Максимум'>
            <span className='font-sans text-[0.625rem]'>попыток</span>
          </Input>
          <Input {...register('maxScore', { valueAsNumber: true })} placeholder='Максимум'>
            <span className='font-sans text-[0.625rem]'>баллов</span>
          </Input>
          <CourseSectionDelete sectionId={sectionData.id} pageId={sectionData.pageId} />
          <Button className='w-64' color='outlined' type='submit' disabled={!isValid}>
            <Icon type='save' className='text-inherit' />
            <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Сохранить</span>
          </Button>
        </footer>
      </form>
    </Card>
  );
};
