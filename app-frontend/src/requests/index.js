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

export const getNewsSearch = ({
  token,
  search,
  startDate,
  endDate,
  categories,
  sources,
}) => {
  return axios.post(
    process.env.REACT_APP_API_URL + "/news/search",
    {
      search,
      categories,
      sources,
      begin_date:
        startDate.getFullYear() +
        "-" +
        (startDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        startDate.getDate().toString().padStart(2, "0") +
        " " +
        startDate.getHours().toString().padStart(2, "0") +
        ":" +
        startDate.getMinutes().toString().padStart(2, "0") +
        ":" +
        startDate.getSeconds().toString().padStart(2, "0"),
      end_date:
        endDate.getFullYear() +
        "-" +
        (endDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        endDate.getDate().toString().padStart(2, "0") +
        " " +
        endDate.getHours().toString().padStart(2, "0") +
        ":" +
        endDate.getMinutes().toString().padStart(2, "0") +
        ":" +
        endDate.getSeconds().toString().padStart(2, "0"),
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updatePreferences = ({ token, categories, sources, authors }) => {
  return axios.post(
    process.env.REACT_APP_API_URL + "/user/preferences",
    {
      categories,
      sources,
      authors,
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
