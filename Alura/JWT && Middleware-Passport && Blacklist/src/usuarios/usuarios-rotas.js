const usuariosControlador = require('./usuarios-controlador');
//Importa os middleswares criardos no arquivo middlewares, mas que..
//..tem suas estrategias definidas no arquivo estrategias
const middlewareAutenticacao = require('../middlewares-autenticacao');

module.exports = (app) => {
  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)
    .get(usuariosControlador.lista);

  app
    .route('/usuario/:id')
    .delete(middlewareAutenticacao.bearer, usuariosControlador.deleta);

  app
    .route('/usuario/login')
    .post(middlewareAutenticacao.local, usuariosControlador.login);

  app
    .route('/usuario/logout')
    .get(middlewareAutenticacao.bearer, usuariosControlador.logout);
};
