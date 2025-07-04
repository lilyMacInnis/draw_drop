import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import {Link} from 'react-router';
import toast from 'react-hot-toast';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoopIcon from '@mui/icons-material/Loop';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Input from '../components/Input';
//import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if(!formData.userName.trim()){
      return toast.error("User Name is Required");
    }
    if(!formData.email.trim()){
      return toast.error("Email is Required");
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
      return toast.error("Invalid email format");
    }
    if(!formData.password){
      return toast.error("Password is Required");
    }
    if(formData.password.length < 6){
      return toast.error("Password must be at least 6 characters");
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success === true){
      try{
        await signup(formData);
        toast.success("Signed up successfully");
      } catch (error){
        console.log("Error in signup handlesubmit: ", error);
        return toast.error("Something went wrong: " + error);
      }
    } else {
      return success;
    }
  };

  return (
    <div className="bg-background min-h-screen pt-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-bgUltra border border-bgDark rounded-2xl p-4 sm:p-6 space-y-6 sm:space-y-8">
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl text-textl font-semibold">Create Account</h1>
          </div>

          <form onSubmit={handleSubmit}>
            
            <div className="flex flex-col items-center gap-3">
              <div className='w-full'>
                <Input
                  Icon={<PersonIcon />}
                  name="User Name:"
                  type="text"
                  placeholder="Your Name"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value})}
                />
              </div>

              <div className='w-full'>
                <Input
                  Icon={<EmailIcon />}
                  name="Email:"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                />
              </div>

              <div className='flex flex-col gap-1 w-full'>
                <span className='text-base text-textl'>Password:</span>
                <div className='relative mb-3 flex items-center'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-primary'>
                      <LockIcon />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='●●●●●●'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                    className='w-full pl-10 pr-2 py-1.5 outline-none rounded-lg bg-background/40 border border-bgDark focus:border-primaryl/50 focus:border-2 focus:bg-bgUltra hover:bg-bgUltra text-textl transition duration-200'
                  />
                  <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 left-[92%] flex items-center pl-2 text-primary hover:text-primaryl'
                  >
                      {showPassword ? (
                          <VisibilityOffIcon />
                      ): (
                          <VisibilityIcon />
                      )}
                  </button>
                </div>
              </div>

              
              <button 
                type="submit" 
                disabled={isSigningUp}
                className='bg-primary text-white text-lg font-semibold w-full hover:bg-primaryl rounded-lg py-2'
              >
                {isSigningUp ? (
                  <>
                    <LoopIcon className='animate-spin' />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

          </form>

          <div className='flex justify-center'>
            <p className='text-textl '>
              Already have an account?{" "}
              <Link to="/login" className='text-primary hover:underline'>
                Sign in
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUpPage
