const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
};

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
};

const setUser = (user) => {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;
