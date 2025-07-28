import axios from "axios";
const BASE_URL = "http://localhost:8080/user";
import { config } from '../config'

export async function addNewUser(user) {
  try {
    const url = `${config}/user/signup`
    const body = user
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response.status == 200) {
      return response.data
    }
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

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
