import axios from "axios";

export const loginUser = async ({ username, password }) => {
  return axios.post(process.env.REACT_APP_API_URL + "/auth/login", {
    username,
    password,
  });
};

export const registerUser = async ({
  name,
  username,
  password,
  repassword,
}) => {
  return axios.post(process.env.REACT_APP_API_URL + "/auth/register", {
    name,
    username,
    password,
    repassword,
  });
};

export const checkUser = ({ token }) => {
  return axios.get(process.env.REACT_APP_API_URL + "/auth/user", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = ({ token }) => {
  return axios.get(process.env.REACT_APP_API_URL + "/auth/logout", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNews = ({ token }) => {
  return axios.get(process.env.REACT_APP_API_URL + "/news", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNewsCategory = ({ token, category }) => {
  return axios.post(
    process.env.REACT_APP_API_URL + "/news/category",
    {
      category,
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
