'use client';

import { ISODateString } from 'next-auth';
import { useEffect, useState } from 'react';

export const useGetTitleHello = (expires?: ISODateString) => {
  const [titleTime, setTitleTime] = useState('Добрый день');
  useEffect(() => {
    if (expires) {
      const time = new Date(expires).getHours();
      if (time >= 0 && time < 6) {
        setTitleTime('Доброй ночи');
      } else if (time >= 6 && time < 12) {
        setTitleTime('Доброе утро');
      } else if (time >= 18 && time < 24) {
        setTitleTime('Добрый вечер');
      }
    }
  }, [expires]);
  return titleTime;
};
