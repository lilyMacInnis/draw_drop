import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoopIcon from '@mui/icons-material/Loop';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import OAuth from '../components/OAuth';

const LoginPage = () => {
  const { authUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      await login(formData);
      if(authUser){
        toast.success("Logged in successfully");
      } else{
        toast.error("Invalid credentials");
      }
    } catch(error){
      console.log("Error in login handlesubmit: ", error);
       toast.error("Something went wrong: " + error);
    }
  }

  return (
    <div className="bg-background min-h-screen pt-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-bgUltra border border-bgDark rounded-2xl p-4 sm:p-6 space-y-6 sm:space-y-8">

          <div className="text-center">
            <h1 className="text-xl sm:text-2xl text-textl font-semibold">Welcome Back</h1>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="flex flex-col items-center gap-3">

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

              {/* {error ?? <p className='text-red-500'>{error}</p>} */}

              
              <button 
                type="submit"
                disabled={isLoggingIn}
                className='bg-primary text-white text-lg font-semibold w-full hover:bg-primaryl rounded-lg py-2'
              >
                {isLoggingIn ? (
                  <>
                    <LoopIcon className='animate-spin' />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <OAuth text="Login"/>
            </div>              

          </form>

          <div className='flex justify-center'>
            <p className='text-textl '>
              Don't have an account?{" "}
              <Link to="/signup" className='text-primary hover:underline'>
                Create account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
