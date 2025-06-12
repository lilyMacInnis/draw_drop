import React from 'react'
import { useAuthStore } from '../store/authStore'

const HomePage = () => {
  const {isSigningUp, authUser, isAuthenticated} = useAuthStore();
  return (
    <div>
      home

      <div>
          {
            console.log("isSignUp + auth User + isAuth: " + isSigningUp + authUser + isAuthenticated)
            
          }
        </div>
    </div>
  )
}

export default HomePage
