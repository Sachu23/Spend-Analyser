import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const loggedIn = localStorage.getItem('isLoggedIn');
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');
    
  const navigate = useNavigate()

  const onButtonClick = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome home {name}!</div>
      </div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default Home;