import React from 'react'
import { useState } from 'react'
//import { authStore } from '../store/authStore';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  //const {signup, isSigninUp} = authStore();

  //const validateForm = () => {

  //};
  const handleSubmit = (e) => {
    e.preventDefault();
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
                    placeholder='......'
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
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
