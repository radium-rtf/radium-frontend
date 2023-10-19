export interface CourseResponseDto {
  authors: [
    {
      avatar: string;
      email: string;
      id: string;
      isTeacher: true;
      name: string;
    },
  ];
  banner: string;
  description: string;
  id: string;
  links: [
    {
      link: string;
      name: string;
    },
  ];
  logo: string;
  maxScore: number;
  modules: [
    {
      id: string;
      maxScore: number;
      name: string;
      order: number;
      pages: [
        {
          id: string;
          maxScore: number;
          name: string;
          order: number;
          score: number;
          sections: [
            {
              answer: string;
              answers: string[];
              content: string;
              id: string;
              maxScore: number;
              order: number;
              pageId: string;
              score: number;
              type: 'choice';
              variants: string[];
              verdict: 'OK';
            },
          ];
          slug: string;
        },
      ];
      score: number;
      slug: string;
    },
  ];
  name: string;
  score: number;
  shortDescription: string;
  slug: string;
}
