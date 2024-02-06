'use client';

import { useEffect } from 'react';

export const useUpdateTitle = (title?: string | null) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
  return null;
};
