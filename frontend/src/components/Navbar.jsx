import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router';
import { useThemeStore } from '../store/useThemeStore';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const {authUser, logout} = useAuthStore();
  const [isDark, setIsDark] = useState(false);
  const {setTheme} = useThemeStore();

  const handleChangeTheme = () => {
    setIsDark(!isDark);

    if(isDark){
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else{
      localStorage.setItem("theme", "light");
      setTheme("light")
    }
  };

  return (
    <header className='bg-bgUltra border-b-2 border-background w-full top-0 z-40'>
      <div className='container mx-auto px-4 h-14'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to="/" className='flex items-center gap-2.5 transition-all'>
              <h1 className='size-10 text-2xl font-extrabold text-primary hover:text-primaryl rounded-lg flex items-center justify-center'>Logo</h1>
            </Link>
          </div>

          <div className='flex items-center gap-20'>

            <div className='relative bottom-3'>
              <label>
                <input
                  type='checkbox'
                  checked={isDark}
                  onChange={handleChangeTheme}
                  className='sr-only peer'
                />
                {/*peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary */}
                <div className='absolute w-14 h-7 bg-background hover:bg-primary/20  ring-2 ring-background rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary 
                  after:absolute after:top-0.5 after:start-[4px] after:bg-primary after:border-primary after:border after:rounded-full after:h-6 after:w-6 after:transition-all'
                />
                <span className='absolute left-1 transition-transform duration-300 peer-checked:hidden'>
                  <DarkModeIcon className='p-0.5 text-background'/>
                </span>
                <span className='absolute left-7 hidden peer-checked:inline transition-transform duration-300'>
                  <LightModeIcon className='p-0.5 text-background'/>
                </span>
              </label>
            </div>
            

            {authUser && (
              <>
                <div className='flex items-center gap-5'>
                  <Link to="/profile" className='flex items-center rounded-xl border border-bgDark bg-bgUltra hover:bg-background'>
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt="Profile"
                      className='size-8 p-[0.1875rem] rounded-full'
                    />
                    <span className='font-semibold text-primary mr-1'>Profile</span>
                  </Link>

                  <Link to="/inbox" className='rounded-xl border border-bgDark bg-bgUltra hover:bg-background'>
                    <InboxIcon className='p-[0.1875rem] text-primary'/>
                    <span className='font-semibold text-primary mr-1'>Inbox</span>
                  </Link>

                  <button onClick={logout} className='rounded-xl border border-bgDark bg-bgUltra hover:bg-background'>
                    <LogoutIcon className='p-[0.1875rem] text-primary'/>
                    <span className='font-semibold text-primary mr-1'>Logout</span>
                  </button>
                </div>
              </>
            )}

            {!authUser && (
              <>
                <Link to="/login" className='rounded-lg border-2 border-background bg-bgUltra hover:bg-background gap-5 mr-0'>
                  <LoginIcon className='p-[0.1875rem] text-primary'/>
                  <span className='font-semibold text-primary mr-1'>Login</span>
                </Link>
              </>
            )}
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Navbar
