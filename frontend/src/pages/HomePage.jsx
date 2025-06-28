import React from 'react'
import { useNavigate } from 'react-router'

//import { useAuthStore } from '../store/authStore'

const HomePage = () => {
  const navigate = useNavigate();
  //const {isSigningUp, authUser, isAuthenticated} = useAuthStore();
  return (
    <div className='bg-background'>
      Welome

      <button onClick={() => {navigate('/search')}}>
        click here to send a drawing
      </button>
    </div>
  )
}

export default HomePage
