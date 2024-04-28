import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./login.css";

const Login = ({setLoggedIn, preppre}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()
  localStorage.clear();

  const onButtonClick = async () => {
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
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
    try {
      const response = await fetch('http://localhost:9000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();

      if (response.ok) {
        // Redirect or do something upon successful registration
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('isLoggedIn', true);
        setLoggedIn(true);
        navigate('/'); // Assuming you want to navigate to login page
      } else {
        // Handle error response
        const errorData = await response.json();
        // Display error message to user or handle as necessary
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle network or other errors
    }
  }

  const navigateToRegister = () => {
    navigate("/register");
  }
  

  return (
    <div className={'mainContainer'}>
      <div className={'extracontainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      <br/>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={navigateToRegister} value={'Register'} />
      </div>
      </div>
    </div>
  )
}

export default Login;