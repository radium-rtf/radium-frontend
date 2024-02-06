'use client';
import { Dispatch, SetStateAction, createContext } from 'react';

interface ICourseEditContext {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const defaultState: ICourseEditContext = {
  isEditing: false,
  setIsEditing: () => {},
};

export const CourseEditContext = createContext<ICourseEditContext>(defaultState);
