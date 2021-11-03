import axios from "axios";
import TokenService from "./token-service";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Interceptors: Você pode interceptar requisições
// ou respostas antes de serem manipuladas pelo then ou catch

// Adiciona um interceptador na requisição
instance.interceptors.request.use(
  (config) => {
    // Faz alguma coisa antes da requisição ser enviada

    // Resgata o access-token
    const token = TokenService.getLocalAccessToken();

    // Se o token existir, adiciona-o no cabeçalho da requisição
    if (token) {
      //config.headers["Authorization"] = 'Bearer ' + token
      config.headers["x-access-token"] = token;
    }

    return config;
  },
  (error) => {
    // Faz alguma coisa com o erro da requisição

    return Promise.reject(error);
  }
);

// Adiciona um interceptador na resposta
instance.interceptors.response.use(
  (response) => {
    // Qualquer código de status que dentro do limite de 2xx faz com que está
    // função seja acionada

    // Faz alguma coisa com os dados de resposta

    return response;
  },
  async (error) => {
    // Códigos fora do limite de 2xx

    // Faz alguma coisa com o erro da resposta

    // Pega a configuração original da resposta
    const originalConfig = error.config;

    // Verifica se o erro da resposta não veio de uma tentativa de login
    if (originalConfig.url != "/auth/signin" && error.response) {
      // Verifica se o erro aconteceu pq o AccessToken foi expirado (tempo)
      // _retry serve como uma tag para evitar loop infinito
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        // Vamos tentar gerar um novo token de acesso usando o RefreshToken
        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          // Retorna a instacia com nova configuração para evitar loop
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
