import api from "../../API/api";
import { GET_ALL_USERS } from "../AdminPannel/api/routes";


export const getAllUsers= async () => {
  const res = await api.get(GET_ALL_USERS);
  return res.data;
};