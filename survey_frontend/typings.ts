export type DetailSurveyResponse = {
  survey: DetailSurvey;
  has_submitted: boolean;
};

export type DetailSurvey = {
  id: number;
  user_id: number;
  title: string;
  content?: string;
  response_count: number;
  created_at: string;
  updated_at: string;
  questions: {
    id: number;
    survey_id: number;
    name: string;
    answer_count: number;
    created_at: string;
    updated_at: string;
    choices: {
      id: number;
      question_id: number;
      name: string;
      answer_count: number;
      created_at: string;
      updated_at: string;
    }[];
  }[];
};
