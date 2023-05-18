import { useState } from "react";
import axios from "axios";

const useToken = () => {
    const key = "token-innews";

    const getToken = () => {
        const tokenString = localStorage.getItem(key);
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem(key, JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token,
    };
};

export default useToken;
