import React from 'react'
import { Link, useNavigate } from 'react-router'

//import { useAuthStore } from '../store/authStore'

const HomePage = () => {
  const navigate = useNavigate();
  //const {isSigningUp, authUser, isAuthenticated} = useAuthStore();
  return (
    <div className='h-screen w-screen bg-gradient-to-b from-bgUltra from-50% to-primaryl flex items-center justify-center text-wrap text-center p-5 pb-24'>
      
      <div className='text-textl text-2xl flex flex-col items-center gap-3'>
        <h1 className='text-textPrimary text-3xl font-semibold'>Welcome to Draw Box</h1>
        <p>where you can send anyone an anonymous or public drawing!</p>
        <p className='pb-2'>Or, <Link className='text-primary hover:underline hover:text-primaryl' to="/signup">sign up</Link> to receive drawings. </p>

        <button 
          className='bg-gradient-to-br from-primary to-accent hover:from-primaryl hover:to-accentl text-white font-semibold text-4xl rounded-xl px-4 py-2'
          onClick={() => {navigate('/search')}}
        >
          Click to Send a Drawing
        </button>
      </div>
    </div>
  )
}

export default HomePage
