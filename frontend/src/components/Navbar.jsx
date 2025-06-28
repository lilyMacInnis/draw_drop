import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router';
import { useThemeStore } from '../store/useThemeStore';

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
    <header>
      <div className='flex items-center justify-between'>
        <div>
          <Link to="/">
            <h1>Logo</h1>
          </Link>
        </div>

        <div>
          <button onClick={handleChangeTheme}>
            Dark?
          </button>
        </div>

        <div>
          {!authUser && (
            <>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </>
          )}
        </div>

        <div>
          {authUser && (
            <>
              <Link to="/inbox">
                <span>Inbox</span>
              </Link>

              <button onClick={logout}>
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
