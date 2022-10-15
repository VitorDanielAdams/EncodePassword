import axios from "axios";

const authService = () => {

    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    }

    const setAuthToken = (token: string) => {
        const decodedToken = parseJwt(token);
        if (token) {
            if (decodedToken.exp * 1000 > Date.now()) {
                return axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        }
        localStorage.removeItem("token");
        return delete axios.defaults.headers.common["Authorization"];
    }

    const logout = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    }

    return { setAuthToken, logout };
}

export default authService;
