var express = require('express');
var compression = require('compression');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var crypto = require('./crypto.js');

app.use(compression())
app.use(bodyParser.json());

app.post('/encrypt', function(request, response) {
  const passphrase = request.body.passphrase
  const stringifiedBody = JSON.stringify(request.body)
  const encrypted = crypto.encrypt(stringifiedBody, passphrase)
  response.send(encrypted)
})

app.post('/decrypt', function(request, response) {
  const object = request.body.encrypted
  const passphrase = request.body.passphrase
  let decrypted
  let parsed
  try {
    decrypted = crypto.decrypt(object, passphrase)
    parsed = JSON.parse(decrypted)
  } catch (e) {
    response.send({
      message: 'Encrypted text or passphrase invalid',
      name: ''
    })
  }
  if (moment().isBefore(parsed.expirationDate) || parsed.expirationDate === '') {
    response.send(parsed)
  } else {
    response.send({
      message: 'Message has expired',
      name: ''
    })
  }
})

app.listen('3001')
