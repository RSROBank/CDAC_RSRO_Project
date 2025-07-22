import axios from 'axios';
const BASE_URL = 'http://localhost:8080/products';
export const getAllProducts = () => {
  return axios.get(BASE_URL);
};

export const addNewProduct = (Product) => {
  return axios.post(BASE_URL, Product);
};
export const getProductById = (id) => {
  return axios.get(BASE_URL + `/${id}`);
};
export const updateProduct = (id, Product) => {
  return axios.put(BASE_URL + `/${id}`, Product);
};
export const deleteProductById = (id) => {
  return axios.delete(BASE_URL + `/${id}`);
};
