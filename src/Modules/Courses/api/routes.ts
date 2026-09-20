export const COURSE_BASE = "/course";

export const GET_ALL_COURSES = `${COURSE_BASE}`;
export const GET_COURSE_BY_ID = `${COURSE_BASE}/:id`;
export const ADD_COURSE = `${COURSE_BASE}/addCourse`;
export const UPDATE_COURSE = (id: string) => `${COURSE_BASE}/updateCourse/${id}`;
export const DELETE_COURSE = (id: string) => `${COURSE_BASE}/deleteCourse/${id}`;
export const ADD_INTERVIEW_QUESTIONS = (id: string) => `${COURSE_BASE}/${id}/addInterviewQuestions`;
export const UPLOAD_TOPIC_IMAGES = (courseId: string, chapterIndex: number, topicIndex: number) =>
  `${COURSE_BASE}/${courseId}/${chapterIndex}/${topicIndex}/images`;
export const SET_TOPIC_CONTENT_BLOCKS = (courseId: string, chapterIndex: number, topicIndex: number) =>
  `${COURSE_BASE}/${courseId}/${chapterIndex}/${topicIndex}/content`;
