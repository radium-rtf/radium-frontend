'use client';
import {
  CodeSectionResponseDto,
  useAnswerCourseCodeSectionMutation,
} from '@/entities/CourseSection';
import {
  Button,
  Card,
  cn,
  CodeEditor,
  FileType,
  getNoun,
  Icon,
  InputFile,
  Tab,
  Tabs,
} from '@/shared';
import { FC, useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../lib/answerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select';
import { LanguageDisplay } from '../lib/languageDisplay';
import { Comment } from '@/widgets/Comment';

interface CodeSectionProps {
  sectionData: CodeSectionResponseDto;
}

export const CodeSection: FC<CodeSectionProps> = ({ sectionData }) => {
  // Verdict
  const [verdict, setVerdict] = useState<CodeSectionResponseDto['verdict']>(
    sectionData.verdict
  );

  // IsCodeWriting
  const [isCodeWriting, setIsCodeWriting] = useState(true);

  // Answer
  const [answerCodeSection, { isLoading, isError }] =
    useAnswerCourseCodeSectionMutation();

  // Form init
  const { handleSubmit, control, getValues } = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      lang: sectionData.languages?.[0] || 'javascript',
      answer: sectionData.answer || '',
    },
  });

  const onSubmitHandler: SubmitHandler<answerSchemaType> = (data) => {
    answerCodeSection({
      id: sectionData.id,
      code: {
        answer: data.answer!,
        lang: data.lang!,
      },
    })
      .unwrap()
      .then((result) => {
        setVerdict(result.verdict);
      });
  };

  // Edit checks
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor ||
    session.data?.user.roles.isTeacher ||
    false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditAllowed && isEditMode && isEditing) {
    return null;
  }

  return (
    <Card asChild>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          {sectionData.content}
        </header>
        <Tabs>
          <Tab
            type='button'
            onClick={() => !isCodeWriting && setIsCodeWriting(true)}
            isSelected={isCodeWriting}
            icon='editor'
          >
            Редактор
          </Tab>
          <Tab
            type='button'
            onClick={() => isCodeWriting && setIsCodeWriting(false)}
            isSelected={!isCodeWriting}
            icon='attach'
          >
            Прикрепить файл
          </Tab>
        </Tabs>
        <main className='flex !resize-y flex-col gap-4'>
          {isCodeWriting && (
            <>
              <Controller
                control={control}
                name='lang'
                render={({ field: { onChange } }) => {
                  return (
                    <Select
                      onValueChange={onChange}
                      defaultValue={sectionData.languages?.[0] || 'javascript'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={'Выберите язык'} />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        {(sectionData.languages || ['javascript', 'cpp']).map(
                          (lang) => (
                            <SelectItem key={lang} value={lang}>
                              <div className='flex items-center gap-4'>
                                <Icon type='table' />
                                <span>{LanguageDisplay[lang as 'cpp']}</span>
                              </div>
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              <Controller
                control={control}
                name='answer'
                render={({ field: { onChange } }) => {
                  return (
                    <CodeEditor onChange={onChange} lang={getValues('lang')} />
                  );
                }}
              />
            </>
          )}
          {!isCodeWriting && (
            <Controller
              control={control}
              name='file'
              render={({ field: { onChange } }) => {
                return (
                  <InputFile
                    onFileLoaded={(e) => onChange(e)}
                    allowedFileTypes={FileType.jpg}
                  />
                );
              }}
            />
          )}
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          {isEditAllowed && isEditMode && (
            <div className='flex items-center gap-4'>
              <CourseSectionDelete
                pageId={sectionData.pageId}
                sectionId={sectionData.id}
              />
              <Button
                className='w-64 shrink-0'
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
              <div className='flex flex-col gap-2 text-[0.8125rem]'>
                {verdict === 'OK' && (
                  <span className='text-secondary-default'>Верно!</span>
                )}
                {verdict === 'WAIT' && (
                  <span className='text-accent-primary-200'>
                    Принято на проверку
                  </span>
                )}
                {verdict === 'WA' && (
                  <span className='text-destructive-default'>
                    Не правильно!
                  </span>
                )}
              </div>
              {!isError &&
                !isLoading &&
                verdict !== 'WAIT' &&
                (!!sectionData.score || sectionData.score === 0) && (
                  <span
                    className={cn(
                      'text-[0.8125rem]',
                      verdict === 'OK' && 'text-secondary-default'
                    )}
                  >
                    {verdict === 'OK' &&
                      `${sectionData.maxScore} / ${sectionData.maxScore}`}
                    {verdict === 'WA' && `${0} / ${sectionData.maxScore}`}
                    {verdict === '' && `${sectionData.maxScore}`}
                    <span>
                      {sectionData.score}{' '}
                      {getNoun(sectionData.score, 'балл', 'балла', 'баллов')}
                    </span>
                  </span>
                )}
              <Button type='reset'>Сбросить</Button>
              <Button disabled={isLoading} type='submit' color='accent'>
                Ответить
              </Button>
            </>
          )}
        </footer>
        {sectionData.review && (
          <Comment
            avatar={sectionData.review.reviewer.avatar}
            date={'12 сентября 2023, 14:00'}
            comment={sectionData.review.comment}
            name={sectionData.review.reviewer.name}
          />
        )}
        <DevTool control={control} />
      </form>
    </Card>
  );
};
