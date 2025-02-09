const jsonwebtoken = require('jsonwebtoken');

class Jwt {
  static sign({
    secret,
    payload,
    expiresIn = '100d',
  }) {
    return jsonwebtoken.sign(payload, secret, { expiresIn });
  }

  static verify({
    secret,
    jwt,
  }) {
    return jsonwebtoken.verify(jwt, secret);
  }
}

module.exports = Jwt;
