import api from "./api";

const getPublicContent = () => {
    return api.get("/api/test/all");
};

const getUserBoard = () => {
    return api.get("/api/test/user");
};

const getModeratorBoard = () => {
    return api.get("/api/test/mod");
};

const getAdminBoard = () => {
    return api.get("/api/test/admin");
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
};

export default UserService;
