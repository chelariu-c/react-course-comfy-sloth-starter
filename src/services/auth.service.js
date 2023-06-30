import axios from "axios";

const API_URL = "http://localhost:8082/users/";

const register = (
    firstName,
    lastName,
    email,
    password,
    address,
    contact,
    role
) => {
    const response = axios.post(API_URL + "signup", {
        firstName,
        lastName,
        email,
        password,
        address,
        contact,
        role,
    });
    return response;
};
const login = (email, password) => {
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
