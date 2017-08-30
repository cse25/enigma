# Enigma

### Instructions

* yarn install
* yarn start
* In a new terminal window: yarn server

### Input Validation / Error Handling

Handled in routes.js:
* Expiration date has expired
* Encrypted message is not correct
* Passphrase is not correct

Handled in EnigmaCard.jsx (line 107):
* Cannot set expiration date on or before current date
