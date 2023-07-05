import React, { useContext, useEffect, useState } from "react";
import AuthService from "../services/auth.service";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();

        setCurrentUser(undefined);
    };

    return (
        <UserContext.Provider value={{ logOut, currentUser }}>
            {children}
        </UserContext.Provider>
    );
};
// make sure use
export const useUserContext = () => {
    return useContext(UserContext);
};
