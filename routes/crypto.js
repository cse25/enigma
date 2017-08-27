var CryptoJS = require('crypto-js');

module.exports.encrypt = function(message, passphrase) {
  return CryptoJS.AES.encrypt(message, passphrase).toString()
}

module.exports.decrypt = function(hash, passphrase) {
  return CryptoJS.AES.decrypt(hash, passphrase).toString(CryptoJS.enc.Utf8)
}
