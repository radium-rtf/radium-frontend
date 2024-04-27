import { Card, CardContent, CardHeader, CardTitle, Icon, InputFile } from '@/shared';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { CourseSectionFooter, FileSectionResponseDto } from '@/entities/CourseSection';
import { uploadFile } from '@/shared/api/uploadFile';
import { useAnswerCourseFileSectionMutation } from '@/entities/CourseSection/api/courseSectionApi';

interface FileSectionDisplayProps {
  sectionData: FileSectionResponseDto;
}
export const FileSectionDisplay: FC<FileSectionDisplayProps> = ({ sectionData }) => {
  // Form setup
  const form = useForm<answerSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(answerSchema),
    values: {
      file: null,
    },
  });

  const {
    control,
    setError,
    clearErrors,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const [updateFileAnswerSection] = useAnswerCourseFileSectionMutation();
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const file = data.file;
    let fileUrl: string = '';
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
    const response = await updateFileAnswerSection({
      id: sectionData.id,
      file: {
        answer: fileUrl,
      },
    });
    if ('data' in response) {
      setTimeout(() => reset(undefined, { keepValues: true, keepDirty: false }), 5000);
    } else {
      setError('root', { message: 'Ошибка!' });
    }
  };

  return (
    <FormProvider {...form}>
      <Card>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CardHeader className='flex-row items-center gap-4 space-y-0'>
            <Icon type='task' className='shrink-0 text-primary' />
            <CardTitle className='text-base'>Задание</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownDisplay markdown={sectionData.content} />
          </CardContent>
          <CardContent>
            <Controller
              control={control}
              name='file'
              render={({ field: { onChange } }) => (
                <InputFile
                  allowedFileTypes={sectionData.fileTypes}
                  onFileListChange={(files) => {
                    onChange(files?.item(0));
                    errors.root && clearErrors('root');
                  }}
                />
              )}
            />
          </CardContent>
          <CourseSectionFooter
            isTask
            sectionData={sectionData}
            errorMessage={errors.root?.message || errors.file?.message}
          />
        </form>
      </Card>
    </FormProvider>
  );
};
