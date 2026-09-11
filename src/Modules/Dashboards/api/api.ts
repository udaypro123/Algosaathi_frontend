import api from "../../../API/api";
import { GET_ALL_USERS } from "../../AdminPannel/api/routes";


export const getAllUsers= async () => {
  console.log("api ca;ing mlmd=========================")
  const res = await api.get(GET_ALL_USERS);
  return res.data;
};