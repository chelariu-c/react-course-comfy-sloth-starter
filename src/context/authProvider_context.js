import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // const [state, dispatch] = useReducer();

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// make sure use
export const useAuthProviderContext = () => {
    return useContext(AuthContext);
};

export default AuthContext;
