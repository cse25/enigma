import React, { Component } from 'react'
import './index.css'
import theme from './assets/react-toolbox/theme.js'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import './assets/react-toolbox/theme.css'
import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import Input from 'react-toolbox/lib/input/Input'
import Avatar from 'react-toolbox/lib/avatar/Avatar'
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import axios from 'axios'

class EnigmaCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      message: '',
      expirationDate: '',
      passphrase: '',
      encrypted: '',
      active: false
    }
  }

  actions = [
    { label: "Close", onClick: () => this.handleToggle() },
    { label: "Decrypt", onClick: () => this.decrypt() }
  ];

  componentDidMount() {
    if (localStorage.getItem === '') {
      this.generatePassphrase()
    } else {
      window.location.hash = localStorage.getItem('passphrase')
      this.setState({ passphrase: localStorage.getItem('passphrase')})
    }
  }

  generatePassphrase() {
    const passphrase = Math.random().toString(36).substr(2, 5)
    this.setState({ passphrase })
    localStorage.setItem('passphrase', passphrase)
    window.location.hash = passphrase
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  }

  encrypt = () => {
    this.handleToggle()
    console.log(this.state.expirationDate)
    axios.post('/encrypt', {
      name: this.state.name,
      message: this.state.message,
      expirationDate: this.state.expirationDate,
      passphrase: this.state.passphrase,
    })
      .then(response => this.setState({ encrypted: response.data }))
  }

  decrypt() {
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
          <Card style={{width: '350px'}}>
            <CardTitle title="Enigma" />
              <Avatar title={this.state.name} />
              <Input
                type='text'
                label='Name'
                name='name'
                required
                value={this.state.name}
                onChange={this.handleChange.bind(this, 'name')}
              />
            <Input
              type='text'
              label='Message'
              name='message'
              maxLength={120}
              required
              value={this.state.message}
              onChange={this.handleChange.bind(this, 'message')}
            />
            <DatePicker
              label='Expiration Date'
              name='expirationDate'
              autoOk
              value={this.state.expirationDate}
              onChange={this.handleChange.bind(this, 'expirationDate')}
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
                value={this.state.encrypted}
                onChange={this.handleChange.bind(this, 'encrypted')}
              />
            </Dialog>
            <div>Your Passphrase - {this.state.passphrase}</div>
            <div onClick={() => this.generatePassphrase()}>Generate New Passphrase</div>
          </Card>
        </ThemeProvider>
      </div>
    )
  }
}

export default EnigmaCard
