import api from "./api";
import TokenService from "./token.service";

const register = (
    firstName,
    lastName,
    email,
    password,
    address,
    contact,
    role
) => {
    const response = api.post("/users/signup", {
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
    return api
        .post("/users/signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data) {
                const user = response.data;
                TokenService.setUser(user);
            }

            return response.data;
        });
};

const logout = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
