import publicApi from "./publicApi";

export const googleAuth = async (idToken: string) => {
  const response = await publicApi.post("/auth/google", { idToken });
  return response.data;
};