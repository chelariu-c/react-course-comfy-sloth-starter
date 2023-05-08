import React, { useContext, useEffect, useState, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import reducer from "../reducers/users_reducer";
// import {
//     GET_USERS_BEGIN,
//     GET_USERS_ERROR,
//     GET_USERS_SUCCESS,
//     GET_USER_BEGIN,
//     GET_USER_ERROR,
//     GET_USER_SUCCESS,
// } from "../actions";

const initialState = {
    single_user_loading: false,
    single_user_error: false,
    single_user: {},
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
    // const [auth, setAuth] = useState({});
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const [myUser, setMyUser] = useState(null);
    // const [state, dispatch] = useReducer(reducer, initialState);

    // const fetchUser = async (url) => {
    //     dispatch({ type: GET_USER_BEGIN });
    //     try {
    //         const response = await axios.get(
    //             url,
    //             JSON.stringify({ user, pwd })
    //         );
    //         const getUserData = response.data;
    //         dispatch({ type: GET_USERS_SUCCESS, payload: getUserData });
    //     } catch (error) {
    //         dispatch({ type: GET_USERS_ERROR });
    //     }
    // };
    // useEffect(() => {
    //     fetchUser(url);
    // }, []);

    // const addUser = async (url) => {
    //     dispatch({ type: GET_USER_BEGIN });
    //     try {
    //         const response = await axios.post(url);
    //         const getUserData = response.data;
    //         dispatch({ type: GET_USERS_SUCCESS, payload: getUserData });
    //     } catch (error) {
    //         dispatch({ type: GET_USERS_ERROR });
    //     }
    // };
    // useEffect(() => {
    //     addUser(url);
    // }, []);

    useEffect(() => {
        if (isAuthenticated) {
            setMyUser(user);
        } else {
            setMyUser(false);
        }

        // console.log(`user: ${user}`)
        // console.log(`isAuthenticated: ${isAuthenticated}`)
        // console.log(`loginWithRedirect: ${loginWithRedirect}`)
        // eslint-disable-next-line
    }, [isAuthenticated]);

    return (
        <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
            {children}
        </UserContext.Provider>
    );
};
// make sure use
export const useUserContext = () => {
    return useContext(UserContext);
};
