'use client';
import {
  FC,
  FormEvent,
  LiHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CourseResponseDto } from '@/entities/Course';
import { CourseEditContext } from '@/features/CourseEditContext';
import { Input, List, Progress, cn } from '@/shared';
import { useUpdateCoursePageNameMutation } from '@/entities/CoursePage';

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

  if (isEditing) {
    return (
      <form onSubmit={(e) => formSubmitHandler(e)} className='px-2 py-1.5'>
        <Input name='newName' defaultValue={page.name} />
      </form>
    );
  }

  return (
    <List.Item
      key={page.id}
      {...props}
      className={cn(
        'group rounded-lg border border-transparent transition-colors hover:border-white/10 hover:bg-white/5',
        currentPage === page.id && 'border-white/10 bg-white/5',
        className
      )}
    >
      <List.Icon
        icon='courses'
        className='text-primary-default'
        asChild={page.maxScore !== 0}
      >
        <Progress
          type='radial'
          percentage={(page.score / page.maxScore) * 100}
          theme='primary'
          className='text-transparent'
        />
      </List.Icon>

      <List.Content asChild>
        <Link
          href={`/courses/${params.courseId!}/study/${page.id}`}
          scroll={false}
        >
          <List.Title>{page.name}</List.Title>
          {!!page.maxScore && (
            <List.Subtitle>{`${page.score}/${page.maxScore} баллов`}</List.Subtitle>
          )}
        </Link>
      </List.Content>
      {isEditMode && (
        <button type='button' onClick={() => setIsEditing((prev) => !prev)}>
          <List.Icon
            icon='edit'
            className='h-3 opacity-0 transition-opacity group-hover:opacity-100'
            onClick={() => {}}
          />
        </button>
      )}
    </List.Item>
  );
};
