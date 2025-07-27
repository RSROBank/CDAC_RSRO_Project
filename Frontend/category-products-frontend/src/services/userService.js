import axios from "axios";
const BASE_URL = "http://localhost:8080/user";

export const addNewUser = (user) => {
  return axios.post(BASE_URL + "/signup", user, {
    headers: {
    "Content-Type": "multipart/form-data"
    }
  })
};

export const loginUser = async (email, password) => {
  const res = await fetch(BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
};
