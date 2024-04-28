import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./register.css";

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [verifypassword, setVerifyPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [verifyPasswordError, setVerifyPasswordError] = useState('')
  const [registerOutput, setRegisterError] = useState('')
  

  const navigate = useNavigate()
  localStorage.clear();

  const onButtonClick = async () => {
    setNameError('')
    setEmailError('')
    setPasswordError('')
    setVerifyPasswordError('')
    setRegisterError('')

    // Check if the user has entered both fields correctly
    if ('' === name) {
        setNameError('Please enter your name')
        return
    }

    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    if (password !== verifypassword){
        setVerifyPasswordError('Passwords dont match')
        return
    }
    try {
        const response = await fetch('http://localhost:9000/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        });
  
        if (response.ok) {
          // Redirect or do something upon successful registration
          navigate('/login'); // Assuming you want to navigate to login page
        } else {
          // Handle error response
          const errorData = await response.json();
          // Display error message to user or handle as necessary
          setRegisterError(errorData.error);
          console.error('Registration failed:', errorData.message);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        // Handle network or other errors
      }
    }
  return (
    <div className={'mainContainer'}>
      <div className={'extracontainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <h2>Name</h2>
        <input
          value={name}
          placeholder="Enter your name "
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <h2>Email</h2>
        <input
          value={email}
          placeholder="Enter your email "
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <h2>Password</h2>
        <input
          value={password}
          placeholder="Enter your password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
          type='password'
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <h2>Re-enter Password</h2>
        <input
          value={verifypassword}
          placeholder="Re-enter password"
          onChange={(ev) => setVerifyPassword(ev.target.value)}
          className={'inputBox'}
          type='password'
        />
        <label className="errorLabel">{verifyPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
        <label className="errorLabel">{registerOutput}</label>
      </div>
      </div>
    </div>
  )
}

export default Register;