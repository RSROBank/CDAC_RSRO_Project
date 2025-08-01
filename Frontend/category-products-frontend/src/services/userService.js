import axios from "axios";
const BASE_URL = "http://localhost:8080/user";
import { config } from '../config'
import LoanCard from '../components/FdDeposit';

export async function addNewUser(user) {
  try {
    const url = `${config.serverURL}/user/signup`;
    const response = await axios.post(url, user, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log("response: ",response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export async function LoanCard1(user) {
  try {
    const url = `${config.serverURL}/deposit/savedeposit`;
    const response = await axios.post(url, user, {
    });
    console.log("response: ",response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (ex) {
    console.log("exception:", ex);
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

export async function getCustomerStatement(accountNo, filters) {
  try {
    const response = await axios.get(`${config.serverURL}/user/statements`, {
      params: {
        accountNo: accountNo,
        fromDate: filters.fromDate || undefined,
        toDate: filters.toDate || undefined,
        type: filters.transactionType || undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch statement:", error);
    return null;
  }
}

