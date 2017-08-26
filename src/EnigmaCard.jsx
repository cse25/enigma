import React from 'react'
import theme from './assets/react-toolbox/theme.js'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import './assets/react-toolbox/theme.css'
import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import Input from 'react-toolbox/lib/input/Input'
import Avatar from 'react-toolbox/lib/avatar/Avatar'
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker'
import axios from 'axios'

const EnigmaCard = () =>
  <ThemeProvider theme={theme}>
    <Card style={{width: '300px'}}>
      <CardTitle title="Enigma" />
      <Avatar title="Avatar" />
      <Input type='text' label='Name' name='name' required />
      <Input type='text' label='Message' name='message' maxLength={120} required />
      <DatePicker label='Expiration Date' />
      <Button label="Encrypt" />
      <Button label="Decrypt" />
      <div>Your Passphrase - </div>
      <div>Generate New Passphrase</div>
    </Card>
  </ThemeProvider>

export default EnigmaCard
