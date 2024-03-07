import { jwtDecode } from "jwt-decode";

const validToken = () => {
    const token = localStorage.getItem("token");
    if (!!token) {
        const decodedToken = jwtDecode(token);
        if(!!decodedToken.jti && !!decodedToken.exp){
            const currentTime = Date.now() / 1000;
            const tokenExpired = decodedToken.exp < currentTime;
            return !tokenExpired;
          }
        return false;
    }
    return false;
};

export default validToken;