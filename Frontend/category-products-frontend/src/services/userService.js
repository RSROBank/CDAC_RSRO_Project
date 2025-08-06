import axios from "axios";
const BASE_URL = "http://localhost:8080/user";
import { config } from "../config";
import LoanCard from "../components/FdDeposit";

const token = sessionStorage.getItem("jwt");

export async function addNewUser(user) {
  try {
    const url = `${config.serverURL}/user/signup`;
    const response = await axios.post(url, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response: ", response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export const getCustomerProfileById = async (userId) => {
  try {
    const url = `${config.serverURL}/user/profile/${userId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile data: ", res);

    if (res.status === 200) {
      return res.data;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getEmployeeProfileById = async (userId) => {
  try {
    const url = `${config.serverURL}/user/employeeprofile/${userId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile data: ", res);
    if (res.status == 200) {
      return res.data;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getAdminProfileById = async (userId) => {
  try {
    const url = `${config.serverURL}/user/adminprofile/${userId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile data: ", res);
    if (res.status == 200) {
      return res.data;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const createLoanQuery = async (body) => {
  try {
    const url = `${config.serverURL}/user/loanquery`;
    const res = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getAllLoanById = async (userId) => {
  try {
    const url = `${config.serverURL}/user/loanquery/${userId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getAllLoanByEmpId = async (empId) => {
  try {
    const url = `${config.serverURL}/employee/loanquery/${empId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const sendResponseLoanById = async (queryid, message) => {
  try {
    const body = {
      response: message,
    };
    const url = `${config.serverURL}/employee/loanquery/${queryid}`;
    const res = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const updateCustomerProfileById = async (userId, userData) => {
  try {
    const url = `${config.serverURL}/user/profile/${userId}`;
    const res = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      userData,
    });
    console.log("response data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const loginUser = async (email, password) => {
  const res = await fetch(BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
};

export async function getCustomerStatement(userId) {
  try {
    const response = await axios.get(`${config.serverURL}/transactions/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch statement:", error);

    // Optional: Log specific error reason
    if (error.response?.status === 401) {
      console.warn("Unauthorized request – invalid or expired token");
    }

    return null;
  }
}

export async function LoanCard1(user) {
  try {
    const url = `${config.serverURL}/deposit/savedeposit`;
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      user,
    });
    // const response = await axios.post(url, user, {});
    console.log("response: ", response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export const saveLoanByUserId = async (userId, loan) => {
  try {
    const url = "http://localhost:8080/user/loans/saveloan";
    const body = {
      amount: loan.amount,
      tenureMonths: loan.tenure,
      userId: userId,
      totalEmis: loan.emiLeft,
      emiAmount: loan.emi,
      interestRate: loan.interestRate,
      status: "PENDING"
    };
    console.log(body)
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("loan data: ", res);
    if (res.status == 200) {
      return res.data;
    }
  } catch (ex) {
    console.error("Error submitting loan:", ex.message);
    console.log("exception: ", ex);
  }
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(
    `${BASE_URL}/verifyOtp`,
    { email, otp },
    { withCredentials: true }
  );
  console.log(response);
  return response.data;
};

export const getCustomerDashBoardDetailByUserId = async (userId) => {
  try {
    const url = `${config.serverURL}/transactions/dashboard/${userId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (ex) {
    console.log("error while fetching dashboard data : ", ex);
  }
}

export const updateCardDetailByUserId = async (userId, body) => {
  try {
    console.log(body);
    const url = `${config.serverURL}/transactions/cardupdate/${userId}`;
    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (ex) {
    console.log("error while fetching dashboard data : ", ex);
  }
}

export const getAllTransactions = async () => {
  try {
    const url = `${config.serverURL}/employee/alltransactions`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (ex) {
    console.log("error while fetching dashboard data : ", ex);
  }
}


export const getAddEmployeee = async () => {
  try{
    const url = `${config.serverURL}/employeeCreate`;
    const response = await axois.get(url, {
      headers: {
        Autorization:`Bearer: ${token}`,
      },
    })
    console.log(response);
    return response.data;
  } catch (ex) {
    consoel.log("error while fetching employee details :", ex);
  }
}