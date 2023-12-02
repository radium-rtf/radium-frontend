export interface updateMappingSectionRequestDto {
  sectionId: string;
  mapping: {
    question: string;
    answer: string[];
    keys: string[];
  };
}
