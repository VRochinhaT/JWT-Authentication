// Classe que providencia metodos para controlar-mos o Token
// e informações do usuário que estão salvas no Browser
class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));

    return user ? user.refreshToken : null;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));

    return user ? user.accessToken : null;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
