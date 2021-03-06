import React, { Component } from 'react'
import axios from 'axios'
import theme from './assets/react-toolbox/theme.js'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import Avatar from 'react-toolbox/lib/avatar/Avatar'
import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import './assets/react-toolbox/theme.css'

class EnigmaCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      message: '',
      expirationDate: '',
      passphrase: '',
      encrypted: '',
      active: false,
    }
  }

  actions = [
    { label: 'Close', onClick: () => this.handleToggle() },
    { label: 'Decrypt', onClick: () => this.decrypt() }
  ]

  componentWillMount() {
    if (localStorage.getItem === '') {
      this.generatePassphrase()
    } else {
      window.location.hash = localStorage.getItem('passphrase')
      this.setState({ passphrase: localStorage.getItem('passphrase') })
    }
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value })
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active })
  }

  generatePassphrase() {
    const passphrase = Math.random().toString(36).substr(2, 5)
    this.setState({ passphrase })
    localStorage.setItem('passphrase', passphrase)
    window.location.hash = passphrase
  }

  encrypt = () => {
    this.handleToggle()
    axios.post('/encrypt', {
      name: this.state.name,
      message: this.state.message,
      expirationDate: this.state.expirationDate,
      passphrase: this.state.passphrase,
    })
      .then(response => this.setState({ encrypted: response.data }))
  }

  decrypt = () => {
    axios.post('/decrypt', {
      encrypted: this.state.encrypted,
      passphrase: this.state.passphrase,
    })
      .then(response => this.setState({
        message: response.data.message,
        name: response.data.name,
      }))
      this.handleToggle()
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Card style={{ width: '350px', padding: '10px' }}>
            <CardTitle title="Enigma" />
              <Input
                icon={<Avatar title={this.state.name} />}
                type='text'
                label='Name'
                name='name'
                required
                value={this.state.name}
                onChange={(value) => this.handleChange('name', value)}
              />
            <Input
              type='text'
              label='Message'
              name='message'
              maxLength={120}
              required
              value={this.state.message}
              onChange={(value) => this.handleChange('message', value)}
            />
            <DatePicker
              label='Expiration Date'
              name='expirationDate'
              // Comment out next line to allow selection of current or previous date.
              minDate={new Date()}
              autoOk
              value={this.state.expirationDate}
              onChange={(value) => this.handleChange('expirationDate', value)}
            />
            <span>
              <Button
                label="Encrypt"
                name="encrypt"
                onClick={this.encrypt}
              />
              <Button
                label="Decrypt"
                name="decrypt"
                onClick={this.handleToggle}
              />
            </span>
            <Dialog
              actions={this.actions}
              active={this.state.active}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              title='De/Encrypt'
            >
              <Input
                type='text'
                label='Message'
                name='encrypted'
                multiline
                value={this.state.encrypted}
                onChange={(value) => this.handleChange('encrypted', value)}
              />
            </Dialog>
          </Card>
        </ThemeProvider>
        <div style={{ padding: '10px' }}>
          <div>Your Passphrase - {this.state.passphrase}</div>
          <Button onClick={() => this.generatePassphrase()}>Generate New Passphrase</Button>
        </div>
      </div>
    )
  }
}

export default EnigmaCard
