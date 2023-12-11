export interface ModuleDto {
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
}
