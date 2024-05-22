'use client';

import { CoursePageResponseDto } from '@/entities/CoursePage';
import { useEffect, useState } from 'react';

export const useLastCoursePage = (
  courseId: string,
  pageId?: string,
  page?: CoursePageResponseDto,
  pageName?: string
) => {
  const [nextPageId, setNextPageId] = useState<string>('');
  const [nextPageName, setNextPageName] = useState<string>('');

  useEffect(() => {
    const previousPages = JSON.parse(localStorage.getItem('previousPages') || '{}') as {
      [courseId: string]:
        | {
            pageId: string;
            pageName: string;
          }
        | undefined;
    };

    page &&
      localStorage.setItem(
        'previousPages',
        JSON.stringify({
          ...previousPages,
          [courseId]: {
            pageId: pageId,
            pageName: pageName,
          },
        })
      );

    const nextPage = previousPages[courseId];

    if (nextPage) {
      setNextPageId(nextPage.pageId);
      setNextPageName(nextPage.pageName || '');
    }
  }, [courseId, page, pageId, pageName]);
  return { nextPageId, nextPageName };
};
