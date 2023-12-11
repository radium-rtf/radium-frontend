'use client';
import { useSession } from 'next-auth/react';
import { CourseResponseDto } from '../model/CourseResponseDto';
import { useState, useEffect } from 'react';

export const useCourseRoles = (
  course: CourseResponseDto | undefined | null
) => {
  const session = useSession();
  const [isAuthor, setIsAuthor] = useState(false);
  const [isCoauthor, setIsCoauthor] = useState(false);

  useEffect(() => {
    if (!session.data?.user) return;
    if (!course) return;

    const authorsSet = new Set(course.authors.map((author) => author.email));
    const coauthorsSet = new Set(
      course.coauthors.map((author) => author.email)
    );

    console.log(authorsSet, coauthorsSet);

    authorsSet.has(session.data.user.email!) && setIsAuthor(true);
    coauthorsSet.has(session.data.user.email!) && setIsCoauthor(true);
  }, [course, session.data?.user]);

  return { isAuthor, isCoauthor };
};
