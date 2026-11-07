// website\types\faq.d.ts

export interface Faq {
  _id: string;
  page: string;
  question: string;
  answer: string;
  order?: number;
}

export interface FaqResponse {
  success?: boolean;
  data: Faq[];
}
