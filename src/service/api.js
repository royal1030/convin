import axios from "axios";

const url = "http://127.0.0.1:3003/user";
const url2 = "http://127.0.0.1:3003/seconduser";

export const getallUsers = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const addUser = async (user) => {
  return await axios.post(url, user);
};

export const editUser = async (id, user) => {
  return await axios.put(`${url}/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${url}/${id}`);
};

export const getallUsers2 = async (id) => {
  id = id || "";
  return await axios.get(`${url2}/${id}`);
};

export const addUser2 = async (user) => {
  return await axios.post(url2, user);
};

export const editUser2 = async (id, user) => {
  return await axios.put(`${url2}/${id}`, user);
};

export const deleteUser2 = async (id) => {
  return await axios.delete(`${url2}/${id}`);
};
