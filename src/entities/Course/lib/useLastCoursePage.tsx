'use client';

import { useEffect, useState } from 'react';

export const useLastCoursePage = (courseId: string) => {
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

    const nextPage = previousPages[courseId];
    if (nextPage) {
      setNextPageId(nextPage.pageId);
      setNextPageName(nextPage.pageName || '');
    }
  }, [courseId]);

  return { nextPageId, nextPageName };
};
