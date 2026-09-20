import api from "../../../API/api";
import {
  ADD_COURSE,
  ADD_INTERVIEW_QUESTIONS,
  DELETE_COURSE,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
  UPLOAD_TOPIC_IMAGES,
  SET_TOPIC_CONTENT_BLOCKS,
} from "./routes";
import type { AddInterviewQuestionsPayload, CourseItem, CoursePayload } from "./interface";

export const getAllCourses = async () => {
  const res = await api.get(GET_ALL_COURSES);
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await api.get(GET_COURSE_BY_ID.replace(":id", id));
  return res.data;
};

export const addCourse = async (data: CoursePayload) => {
  const res = await api.post(ADD_COURSE, data);
  return res.data;
};

export const updateCourse = async (id: string, data: CoursePayload) => {
  const res = await api.put(UPDATE_COURSE(id), data);
  return res.data;
};

export const deleteCourse = async (id: string) => {
  const res = await api.delete(DELETE_COURSE(id), { data: { id } });
  return res.data;
};

export const addInterviewQuestions = async (id: string, payload: AddInterviewQuestionsPayload) => {
  const res = await api.post(ADD_INTERVIEW_QUESTIONS(id), payload);
  return res.data;
};

export const getCourseByTitle = async (title: string): Promise<CourseItem | null> => {
  const res = await api.get(`${GET_ALL_COURSES}?title=${encodeURIComponent(title)}`);
  const data = res.data;
  const list = Array.isArray(data) ? data : data?.data || data?.courses || [];
  return list.find((item: CourseItem) => item.courseName === title) || null;
};

export const uploadTopicImages = async (
  courseId: string,
  chapterIndex: number,
  topicIndex: number,
  files: File[]
) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const res = await api.post(UPLOAD_TOPIC_IMAGES(courseId, chapterIndex, topicIndex), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const setTopicContentBlocks = async (
  courseId: string,
  chapterIndex: number,
  topicIndex: number,
  blocks: Array<Record<string, unknown>>
) => {
  const res = await api.post(
    SET_TOPIC_CONTENT_BLOCKS(courseId, chapterIndex, topicIndex),
    { blocks }
  );
  return res.data;
};
