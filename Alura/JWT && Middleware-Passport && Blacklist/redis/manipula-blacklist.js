const blacklist = require('./blacklist');

//Transformar callback de blacklist.exists e blacklist.set em uma promises
const { promisify } = require('util');
const existAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const jwt = require('jsonwebtoken');

//Usar função Hash para fixar tamanho (e criptografar) do Token dentro do banco de dados
const { createHash } = require('crypto');
function geraTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

module.exports = {
  adiciona: async (token) => {
    //'Traduz' o jwt para pegar seu tempo de expiração ('exp')
    const dataExpiracao = jwt.decode(token).exp;
    //Caso não queira usar tokenHash, remova-o e mudeo valores abaixos para 'token'
    const tokenHash = geraTokenHash(token);

    //Adiciona token (ou tokenHash) no Redis
    await setAsync(tokenHash, '');
    //Adiciona data de expiração para o token
    blacklist.expireat(tokenHash, dataExpiracao);
  },

  contemToken: async (token) => {
    //Caso não queira usar tokenHash, remova-o e mudeo valores abaixos para 'token'
    const tokenHash = geraTokenHash(token);

    //Verifica se o token existe na tabela
    const resultado = await existAsync(tokenHash);
    return resultado === 1;
  },
};
