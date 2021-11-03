// Como agora temos uma instacia do axios, não precisamos mais importa-lo
import api from "./api";

class UserService {
  getPublicContent() {
    return api.get("/test/all");
  }

  // A instancia do axios já fica encarregada de adicionar o AccessToken
  // no cabeçalho antes de executar a requisição
  getUserBoard() {
    return api.get("/test/user");
  }

  getModeratorBoard() {
    return api.get("/test/mod");
  }

  getAdminBoard() {
    return api.get("/test/admin");
  }
}

export default new UserService();
