const JWT = require('jsonwebtoken');
const  { config } = require('../../config/config')

const secret = config.tokenKey

const createJWT = (payload, options={}) => {
  return JWT.sign(payload, secret, options)
}

module.exports = { createJWT }
