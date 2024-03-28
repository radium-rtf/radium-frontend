import {
  MediaSectionResponseDto,
  useUpdateCourseMediaSectionMutation,
} from '@/entities/CourseSection';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  FileType,
  Icon,
  InputFile,
  Tab,
  Tabs,
  cn,
} from '@/shared';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { Input } from '@/shared/ui/Input';
import { MediaSelection } from './MediaSelection';
import { uploadFile } from '@/shared/api/uploadFile';

interface MediaSectionEditProps {
  sectionData: MediaSectionResponseDto;
}
type MediaItemType = 'link' | 'file';

export const MediaSectionEdit: FC<MediaSectionEditProps> = ({ sectionData }) => {
  // Edit setup
  const [isEditing, setIsEditing] = useState(false);
  const [mediaItem, setMediaItem] = useState<MediaItemType>('link');
  // DND Setup
  const { setActivatorNodeRef, setNodeRef, listeners, transform, transition, isDragging } =
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

  // Form setup
  const {
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<updateSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(updateSchema),
    defaultValues: {
      media: {
        url: sectionData.file.location,
        file: null,
      },
    },
  });

  const [updateMediaSection] = useUpdateCourseMediaSectionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    let fileUrl: string = '';
    if (mediaItem === 'link') {
      if (!data.media.url) {
        return setError('root', { message: 'Введите ссылку!' });
      }
      const response = await updateMediaSection({
        sectionId: sectionData.id,
        media: {
          url: data.media.url,
        },
      });
      if ('data' in response) {
        setIsEditing(false);
      } else {
        setError('root', { message: 'Ошибка!' });
      }
    } else {
      const file = data.media.file;
      if (!file) {
        return setError('root', { message: 'Выберите файл!' });
      }
      const fd = new FormData();
      fd.append('file', file);
      const fileResponse = await uploadFile(fd);

      if (typeof fileResponse !== 'string') {
        fileUrl = fileResponse.location;
      } else {
        return setError('root', { message: 'Файл не загружен!' });
      }
      const response = await updateMediaSection({
        sectionId: sectionData.id,
        media: {
          url: fileUrl,
        },
      });
      if ('data' in response) {
        setIsEditing(false);
      } else {
        setError('root', { message: 'Ошибка!' });
      }
    }
  };

  // Escape control setup
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
      }
    };
    if (isEditing) {
      document.body.addEventListener('keydown', listener);
    }
    return () => {
      document.body.removeEventListener('keydown', listener);
    };
  }, [isEditing]);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'border border-transparent transition-colors',
        isDragging
          ? 'z-10 border-white/10 bg-[#2A2E2E]'
          : '[&:has(.drag:hover)]:border-white/10 [&:has(.drag:hover)]:bg-[#363A3B]'
      )}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <CardHeader className='relative  items-center justify-center space-y-0'>
          <button
            ref={setActivatorNodeRef}
            {...listeners}
            type='button'
            className='drag before:absolute before:inset-0 before:block before:content-[""]'
          >
            <Icon type='handle-horizontal' />
          </button>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {isEditing && (
            <Tabs>
              <Tab
                isSelected={mediaItem === 'file'}
                onClick={() => isEditing && setMediaItem('file')}
                icon='attach'
              >
                Файл
              </Tab>
              <Tab
                isSelected={mediaItem === 'link'}
                onClick={() => isEditing && setMediaItem('link')}
                icon='link'
              >
                Ссылка
              </Tab>
            </Tabs>
          )}

          {isEditing && mediaItem === 'link' && (
            <Controller
              control={control}
              name='media.url'
              render={({ field: { value, onChange } }) => (
                <>
                  <Input
                    aria-label='link'
                    defaultValue={value}
                    onChange={(value) => {
                      onChange(value);
                      errors.root && clearErrors('root');
                    }}
                  />
                </>
              )}
            />
          )}
          {isEditing && mediaItem === 'file' && (
            <Controller
              control={control}
              name='media.file'
              render={({ field: { onChange } }) => (
                <InputFile
                  onFileListChange={(files) => {
                    onChange(files?.item(0));
                    errors.root && clearErrors('root');
                  }}
                  allowedFileTypes={[FileType.gif, FileType.jpg, FileType.png, FileType.mp4]}
                />
              )}
            />
          )}
          {!isEditing && (
            <div className={cn('flex flex-col space-y-1.5')}>
              <MediaSelection sectionData={sectionData} />
            </div>
          )}
        </CardContent>
        <CardFooter className='justify-end gap-4'>
          <CourseSectionDelete sectionId={sectionData.id} pageId={sectionData.pageId} />
          {!isEditing && (
            <Button
              type='button'
              className='w-64 shrink-0 justify-start'
              variant='outline'
              onClick={() => setIsEditing(true)}
            >
              <Icon type='edit' className='text-inherit' />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>Редактировать</span>
            </Button>
          )}
          {isEditing && (
            <Button
              type='submit'
              className='w-64 shrink-0 justify-start'
              variant={!isValid && isSubmitted && !isSubmitting ? 'destructive' : 'outline'}
              disabled={isSubmitting}
              onClick={() => setIsEditing(true)}
            >
              <Icon type={isSubmitting ? 'loading' : 'save'} className='text-inherit' />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                {(isSubmitting && 'Сохраняем...') ||
                  errors.root?.message ||
                  errors.media?.url?.message ||
                  'Сохранить'}
              </span>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
