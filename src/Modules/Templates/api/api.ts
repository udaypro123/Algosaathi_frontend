import api from "../../../API/api";
import publicApi from "../../../API/publicApi";
import {
  ADD_TEMPLATE,
  ADD_TEMPLATE_LEGACY,
  DELETE_TEMPLATE,
  DELETE_TEMPLATE_LEGACY,
  GET_ALL_TEMPLATES_LEGACY,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_LEGACY,
} from "./routes";

const isFormData = (data: any): data is FormData => typeof FormData !== "undefined" && data instanceof FormData;

export const buildTemplateFormData = (payload: any) => {
  const formData = new FormData();

  Object.entries(payload || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          formData.append("images", item);
          return;
        }

        if (typeof item === "string" && item.trim()) {
          formData.append(key, item);
        }
      });
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const addTemplate = async (data: any) => {
  const endpoint = isFormData(data) ? ADD_TEMPLATE : ADD_TEMPLATE_LEGACY;
  const requestData = isFormData(data) ? data : data;

  const res = await api.post(endpoint, requestData, isFormData(requestData)
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : undefined);

  return res.data;
};

export const updateTemplate = async (id: string, data: any) => {
  const endpoint = isFormData(data) ? UPDATE_TEMPLATE(id) : UPDATE_TEMPLATE_LEGACY;
  const requestData = isFormData(data) ? data : data;

  const res = await api.put(endpoint, requestData, isFormData(requestData)
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : undefined);

  return res.data;
};

export const deleteTemplate = async (id: string) => {
  const res = await api.delete(DELETE_TEMPLATE(id), { data: { id } }).catch(() =>
    api.delete(DELETE_TEMPLATE_LEGACY, { data: { id } })
  );

  return res.data;
};

export const getAllTemplates = async () => {
  const res = await publicApi.get(GET_ALL_TEMPLATES_LEGACY);
  return res.data;
};

