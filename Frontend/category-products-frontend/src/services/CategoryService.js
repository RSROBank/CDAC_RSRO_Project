import axios from 'axios';
const BASE_URL = 'http://localhost:8080/categories';
export const getAllCategories = () => {
  return axios.get(BASE_URL);
};

export const addNewCategory = (category) => {
  return axios.post(BASE_URL, category);
};
export const getCategoryById = (id) => {
  return axios.get(BASE_URL + `/${id}`);
};
export const updateCategory = (id, category) => {
  return axios.put(BASE_URL + `/${id}`, category);
};
export const deleteCategoryById = (id) => {
  return axios.delete(BASE_URL + `/${id}`);
};
