'use client';
export const getTextWidth = (text: string, font: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;

  context.font = font || getComputedStyle(document.body).font;

  return context.measureText(text).width;
};
