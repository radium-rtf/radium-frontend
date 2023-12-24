import { useEffect, useState } from 'react';

export const useGetTextWidth = (text: string | undefined, font: string) => {
  const [textWidth, setTextWidth] = useState(0);
  useEffect(() => {
    if (text) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.font = font || getComputedStyle(document.body).font;
        setTextWidth(context.measureText(text).width);
      }
    }
  }, [text, font]);
  return textWidth;
};
