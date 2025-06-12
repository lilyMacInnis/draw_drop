import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Link } from 'react-router';

const Navbar = () => {
  const {authUser, logout} = useAuthStore();

  return (
    <header>
      <div className='flex items-center justify-between'>
        <div>
          <Link to="/">
            <h1>Logo</h1>
          </Link>
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
