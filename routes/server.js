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
  const object = request.body.message
  const passphrase = request.body.passphrase
  const decrypted = crypto.decrypt(object, passphrase)
  const parsedObject = JSON.parse(decrypted)
  if (moment().isBefore(parsedObject.expirationDate)) {
    console.log('if')
    response.send(parsedObject)
  } else {
    console.log('else')
    // trigger dialog
    response.send('Message has expired')
  }
})

app.listen('3001')
