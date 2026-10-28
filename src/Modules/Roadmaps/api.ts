import api from "../../API/api";

export interface RoadmapDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface RoadmapCourse {
  id: string;
  courseName: string;
  documents: RoadmapDocument[];
}

export const getRoadmaps = async (): Promise<RoadmapCourse[]> => {
  const response = await api.get("/roadmaps");
  return response.data.data;
};

export const uploadRoadmapDocument = async (
  courseName: string,
  title: string,
  description: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("courseName", courseName);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);

  const response = await api.post("/roadmaps/documents", formData);
  return response.data;
};

export const deleteRoadmapDocument = async (documentId: string) => {
  const response = await api.delete(`/roadmaps/${documentId}`);
  return response.data;
};

export const downloadRoadmapDocument = async (document: RoadmapDocument) => {
  const response = await api.get(`/roadmaps/${document.id}/download`, {
    responseType: "blob",
  });
  const downloadUrl = URL.createObjectURL(response.data);
  const link = window.document.createElement("a");
  link.href = downloadUrl;
  link.download = document.fileName;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
};

export const formatFileSize = (size: number): string => {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
