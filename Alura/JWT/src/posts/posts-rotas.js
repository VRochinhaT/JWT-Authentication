const postsControlador = require('./posts-controlador');
const middlewareAutenticacao = require('../middlewares-autenticacao');

module.exports = (app) => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(middlewareAutenticacao.bearer, postsControlador.adiciona);
};
