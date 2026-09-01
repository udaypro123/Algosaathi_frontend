
import api from "../../../API/api";
import publicApi from "../../../API/publicApi";
import { ADD_QUERY, ADD_YOUTUBE_POST, DELETE_YOUTUBE_POST, GET_ALL_QUERY, GET_ALL_YOUTUBE_POST, UPDATE_YOUTUBE_POST } from "./routes";

// you tube modules routes and api

export const addYoutubePost= async (data: any) => {
  const res = await api.post(ADD_YOUTUBE_POST, data);
  return res.data;
};

export const updateYoutubePost= async (data: any) => {
  const res = await api.put(UPDATE_YOUTUBE_POST, data);
  return res.data;
};

export const deleteYoutubePost = async (id: string) => {
    console.log("checking arguments in api.ts", id)
  const res = await api.delete(DELETE_YOUTUBE_POST, {
    data: { id },
  });

  return res.data;
};

export const getAllYoutubePost= async () => {
  const res = await api.get(GET_ALL_YOUTUBE_POST);
  return res.data;
};


// send queryy api function 

export const sendQuery = async (data:any)=>{
   const res = await publicApi.post(ADD_QUERY, data)
   return res.data;
}

export const getAllUsersQuery = async ()=>{
   const res = await api.get(GET_ALL_QUERY)
   return res.data;
}