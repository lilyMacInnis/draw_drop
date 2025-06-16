import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import {Link} from 'react-router';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoopIcon from '@mui/icons-material/Loop';
//import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const {signup, isSigningUp, error} = useAuthStore();

  const validateForm = () => {
    if(!formData.userName.trim()){
      return <div className='text-red-500'>User name is required</div>
    }
    if(!formData.email.trim()){
      return <div className='text-red-500'>Email is required</div>
    }
    if(!formData.password){
      return <div className='text-red-500'>Password is required</div>
    }
    if(formData.password.length < 6){
      return <div className='text-red-500'>Password must be at least 6 characters</div>
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success === true){
      try{
        //console.log("formData: ", formData);
        await signup(formData);
        // console.log("authUser after singup: ", authUser);
        // console.log("isAuth after signup: ", isAuthenticated);
        // console.log(isSigningUp);
      } catch (error){
        console.log("Error in signup handlesubmit: ", error);
      }
    } else {
      return success;
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
            <div>
                <span>Username</span>
                <input 
                    type='text'
                    placeholder='Your Name'
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value})}
                />
            </div>

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

            
            <button type="submit" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <LoopIcon className='animate-spin' />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
            

        </form>

        <div>
          <p>
            Already have an account?
            <Link to="/login">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default SignUpPage
