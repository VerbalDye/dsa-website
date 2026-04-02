import dataRequest from "./dataRequest";

class AuthService {
    getToken(stopRedirect) {
        let cookieString = document.cookie;
        if (cookieString) {
        let cookies = cookieString
            .split(';')
            .map(c => c.split('='))
            .reduce((acc, v) => {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {})
        if (cookies.session_token) {
            return cookies.session_token;
        }
        }
        if (!stopRedirect) {
        window.location.assign('/login?redirect=' + encodeURIComponent(window.location.pathname));
        }
    }
    async getProfile() {
        let sessionData = await dataRequest("/api/session", "GET");
        // console.log(sessionData.user);
        return sessionData.user;
    }
    isLoggedIn() {
        return (this.getToken(true)? true : false);
    }
    // async isAdmin() {
    //     let data = await dataRequest("/api/user/admin", "GET");
    //     // console.log(data.admin);
    //     return data.admin;
    // }
    async logout() {
        let data = await dataRequest("/api/user/logout", "POST")
        window.location.assign('/login');
    }
}

export default new AuthService();