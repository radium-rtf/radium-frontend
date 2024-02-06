'use client';

import { useLayoutEffect, useState } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    const scrollHandler = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      setScrollPosition(scroll);
    };

    scrollHandler();
    window && window.addEventListener('scroll', scrollHandler);
    return () => {
      window && window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return scrollPosition;
};
