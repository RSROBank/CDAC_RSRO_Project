import axios from "axios";
const BASE_URL = "http://localhost:8080/user";

export const addNewUser = (user) => {
  return axios.post(BASE_URL + "/signup", user);
};

export const loginUser = async (email, password) => {
  const res = await fetch("https://your-api-domain.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
};
