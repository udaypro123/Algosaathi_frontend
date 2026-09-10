
import api from "../../../API/api";
import { ADD_NEWS, DELETE_NEWS, GET_NEWS, UPDATE_NEWS } from "../routes/routes";


// you tube modules routes and api

export const AddNewsdata= async (data: any) => {
  const res = await api.post(ADD_NEWS, data);
  return res.data;
};

export const updateNews= async (data: any) => {
  const res = await api.put(UPDATE_NEWS, data);
  return res.data;
};

export const deleteNews = async (id: string) => {
    console.log("checking arguments in api.ts", id)
  const res = await api.delete(DELETE_NEWS, {
    data: { id },
  });

  return res.data;
};

export const getAllNews= async () => {
  console.log("api caliing .......")
  const res = await api.get(GET_NEWS);
  return res.data;
};

