import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoopIcon from '@mui/icons-material/Loop';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const {login, isLoggingIn, error} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      await login(formData);
    } catch(error){
      console.log("Error in login handlesubmit: ", error);
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>

            <div>
                <span>Email</span>
                <input 
                    type='email'
                    placeholder='you@example.com'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                />
            </div>

            <div>
                <span>Password</span>
                <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='●●●●●●'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                />
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <VisibilityOffIcon />
                    ): (
                        <VisibilityIcon />
                    )}
                </button>
            </div>

            {error ?? <p className='text-red-500'>{error}</p>}

            
            <button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <LoopIcon className='animate-spin' />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
            

        </form>

        <div>
          <p>
            Don't have an account?
            <Link to="/signup">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
