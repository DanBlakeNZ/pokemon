// TODO: add email validation and error handling.

import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import logo from '../../assets/Pokemon_logo.svg'
import Button from '../../components/Button/Button'

type LoginPageProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type userDetailsType = {
  userName: string
}

export function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email && !password) {
      return
    }

    let name = ''
    switch (email) {
      case 'fpanetta@eab.com':
        name = 'Frank'
        break

      case 'sfarrell@eab.com':
        name = 'Simon'
        break

      case 'jferrer@eab.com':
        name = 'Joe'
        break

      default:
        name = 'Daniel'
        break
    }

    // Perform some validation here.
    const fakeUserDetails: userDetailsType = {
      userName: name,
    }
    localStorage.setItem('userDetails', JSON.stringify(fakeUserDetails))
    setIsLoggedIn(true)
  }

  function handleEmailInput(e: React.FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)
  }

  function handlePasswordInput(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value)
  }

  return (
    <div className="h-full w-full max-w-3xl flex items-center">
      <div className="bg-white h-96 w-full flex flex-col items-center justify-evenly rounded-md border-4 border-pokemon-dark-blue pt-5">
        <img src={logo} className="w-1/4" />
        <form className="flex flex-col  align-middle w-1/2 h-full justify-evenly" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={handleEmailInput}
          />

          <Input
            label="Password"
            placeholder="Please enter your password"
            type="password"
            value={password}
            onChange={handlePasswordInput}
          />
          <Button type="submit" disabled={!email && !password}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
