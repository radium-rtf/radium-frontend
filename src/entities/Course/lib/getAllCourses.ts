import { CourseResponseDto } from '../model/CourseResponseDto';

export const getAllCourses = async (): Promise<CourseResponseDto[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/course`
  );

  return response.json();
};
