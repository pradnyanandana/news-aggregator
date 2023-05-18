import { useState } from "react";

const useUser = () => {
    const key = "user-innews";

    const getUser = () => {
        const userString = localStorage.getItem(key);
        const user = JSON.parse(userString);
        return user;
    };

    const [user, setUser] = useState(getUser());

    const saveUser = (user) => {
        localStorage.setItem(key, JSON.stringify(user));
        setUser(user);
    };

    return {
        setUser: saveUser,
        user,
    };
};

export default useUser;
