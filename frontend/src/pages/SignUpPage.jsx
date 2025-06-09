import React from 'react'
import { useState } from 'react'
import { authStore } from '../store/authStore';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const {signup, isSigninUp} = authStore();

  const validateForm = () => {

  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
            <span>Username</span>
            <input 
              type='text'
              placeholder='Your Name'
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value})}
            />

            <span>Email</span>
            <input 
              type='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value})}
            />
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
