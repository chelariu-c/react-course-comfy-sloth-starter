import api from "./api";
import TokenService from "./token.service";

class AuthService {
    register = (
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

    login = (email, password) => {
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

    logout = () => {
        TokenService.removeUser();
    };

    getCurrentUser() {
        return TokenService.getUser();
    }
}

export default new AuthService();
