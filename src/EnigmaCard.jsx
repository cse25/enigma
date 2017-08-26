import React, { Component } from 'react'
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

class EnigmaCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      message: '',
      expirationDate: '',
      passphrase: ''
    }
  }

  componentDidMount() {
    if (this.state.passphrase === '') {
      this.generatePassphrase()
    }
  }

  generatePassphrase() {
    const passphrase = Math.random().toString(36).substr(2, 5)
    this.setState({ passphrase })
    window.location.hash = passphrase
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Card style={{width: '300px'}}>
            <CardTitle title="Enigma" />
            <Avatar title="Avatar" />
            <Input type='text' label='Name' name='name' required />
            <Input type='text' label='Message' name='message' maxLength={120} required />
            <DatePicker label='Expiration Date' />
            <Button label="Encrypt" />
            <Button label="Decrypt" />
            <div>Your Passphrase - {this.state.passphrase}</div>
            <div onClick={() => this.generatePassphrase()}>Generate New Passphrase</div>
          </Card>
        </ThemeProvider>
      </div>
    )
  }
}

export default EnigmaCard
