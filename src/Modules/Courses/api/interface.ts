export type ContentBlockType = "text" | "image";

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
  format: "plain" | "markdown" | "html";
  url: string;
  alt: string;
  caption: string;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  highlights?: Array<{
    text: string;
    color: string;
  }>;
}

export interface Topic {
  _id?: string;
  title: string;
  contentBlocks: ContentBlock[];
  completed: boolean;
  interviewQuestions?: string[];
}

export interface Chapter {
  _id?: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface CourseItem {
  _id: string;
  courseName: string;
  createdBy?: string;
  updatedBy?: string;
  chapters: Chapter[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CoursePayload {
  courseName: string;
  chapters: Chapter[];
}

export interface AddInterviewQuestionsPayload {
  chapterIndex: number;
  topicIndex: number;
  interviewQuestions: string[];
}
