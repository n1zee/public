const crypto = require('crypto');

class Hash {
  static hash({
    secret,
    payload,
  }) {
    return crypto.pbkdf2Sync(payload, secret, 1000, 64, 'sha512')
      .toString('hex');
  }

  static code(length = 25) {
    return crypto.randomBytes(length)
      .toString('hex');
  }

  static encrypt({
    secret,
    payload,
  }) {
    const salt = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(secret, salt, 100000, 256 / 8, 'sha256');
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.write(payload);
    cipher.end();
    const encrypted = cipher.read();
    return Buffer.concat([salt, iv, encrypted])
      .toString('base64');
  }

  static decrypt({
    secret,
    payload,
  }) {
    const encrypted = Buffer.from(payload, 'base64');
    const saltLen = 16;
    const ivLen = 16;

    const salt = encrypted.slice(0, saltLen);
    const iv = encrypted.slice(saltLen, saltLen + ivLen);
    const key = crypto.pbkdf2Sync(secret, salt, 100000, 256 / 8, 'sha256');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    decipher.write(encrypted.slice(saltLen + ivLen));
    decipher.end();

    const decrypt = decipher.read();
    return decrypt.toString();
  }
}

module.exports = Hash;
