//Importa middlewares do passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('./usuarios/usuarios-modelo');
const { InvalidArgumentError } = require('./erros');
const blacklist = require('../redis/manipula-blacklist');

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new InvalidArgumentError('Não existe usuário com esse e-mail');
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);

  if (!senhaValida) {
    throw new InvalidArgumentError('E-mail ou senha inválidos');
  }
}

async function verificaTokenNaBlacklist(token) {
  const tokenNaBlacklist = await blacklist.contemToken(token);
  if (tokenNaBlacklist) {
    throw new jwt.JsonWebTokenError('Token inválido por logout!');
  }
}

passport.use(
  //'passport-local' verifica autenticacoes locais ..
  //.. (Ex: verificação de campo, se ele existe ou se esta preenchido de forma correta)
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        const usuario = await Usuario.buscaPorEmail(email);
        verificaUsuario(usuario);
        await verificaSenha(senha, usuario.senhaHash);

        done(null, usuario);
      } catch (erro) {
        done(erro);
      }
    }
  )
);

passport.use(
  //'passport-bearer' verifica 'bearer token' (ex: JsonWebToken)
  new BearerStrategy(async (token, done) => {
    try {
      await verificaTokenNaBlacklist(token);
      //chave secreta se encontra no arquivo .env
      const playload = jwt.verify(token, process.env.CHAVE_JWT);
      const usuario = await Usuario.buscaPorId(playload.id);
      // Terceiro argumento para passar valor até logout
      done(null, usuario, { token: token });
    } catch (erro) {
      done(erro);
    }
  })
);
