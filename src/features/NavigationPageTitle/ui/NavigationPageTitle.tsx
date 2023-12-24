'use client';
import {
  CSSProperties,
  FC,
  FormEvent,
  LiHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CourseResponseDto } from '@/entities/Course';
import { CourseEditContext } from '@/features/CourseEditContext';
import {
  Input,
  ListContent,
  ListIcon,
  ListItem,
  ListSubtitle,
  ListTitle,
  Progress,
  cn,
} from '@/shared';
import { useUpdateCoursePageNameMutation } from '@/entities/CoursePage';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IProps extends LiHTMLAttributes<HTMLLIElement> {
  currentPage?: string;
  page: CourseResponseDto['modules'][0]['pages'][0];
}

export const NavigationPageTitle: FC<IProps> = ({
  className,
  currentPage,
  page,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const params: { courseId?: string } = useParams();
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);

  const [updateName] = useUpdateCoursePageNameMutation();

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    updateName({ id: page.id, name: fd.get('newName') as string });
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isEditMode && isEditing) {
      setIsEditing(false);
    }
  }, [isEditing, isEditMode]);

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
      }
    };
    if (isEditing) {
      document.addEventListener('keydown', escapeHandler);
    }
    return () => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, [isEditing]);

  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: page.id,
    data: {
      order: page.order,
    },
    disabled: !isEditMode,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  } as CSSProperties;

  if (isEditing) {
    return (
      <div ref={setNodeRef}>
        <form
          ref={formRef}
          onSubmit={(e) => formSubmitHandler(e)}
          className='px-2 py-1.5'
        >
          <Input
            name='newName'
            placeholder='Страница'
            defaultValue={page.name}
            actionIcon='submit'
            onActionClick={() => formRef.current?.requestSubmit()}
          />
        </form>
      </div>
    );
  }

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      key={page.id}
      {...props}
      className={cn(
        'group relative rounded-[0.5rem] border border-transparent transition-colors hover:border-white/10 hover:bg-white/5',
        isEditMode && 'static',
        currentPage === page.id && 'border-white/10 bg-white/5',
        isDragging && 'z-20',
        className
      )}
    >
      <div
        className={cn(isEditMode && 'cursor-grab')}
        ref={setActivatorNodeRef}
        {...listeners}
      >
        <ListIcon
          icon='courses'
          className='text-primary'
          asChild={page.maxScore !== 0}
        >
          <Progress
            type='radial'
            percentage={(page.score / page.maxScore) * 100}
            theme='primary'
            className='text-transparent'
          />
        </ListIcon>
      </div>

      <ListContent asChild>
        <Link
          href={`/courses/${params.courseId!}/study/${page.id}`}
          scroll={false}
          className={cn(
            !isEditMode && 'after:absolute after:inset-0 after:rounded-lg'
          )}
        >
          <ListTitle ref={setActivatorNodeRef}>{page.name}</ListTitle>
          {!!page.maxScore && (
            <ListSubtitle>{`${page.score}/${page.maxScore} баллов`}</ListSubtitle>
          )}
        </Link>
      </ListContent>
      {isEditMode && (
        <button type='button' onClick={() => setIsEditing((prev) => !prev)}>
          <ListIcon
            icon='edit'
            className='h-3 opacity-0 transition-opacity group-hover:opacity-100'
          />
        </button>
      )}
    </ListItem>
  );
};
