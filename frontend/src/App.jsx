import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/authStore'
import InboxPage from './pages/InboxPage'

const App = () => {
  const {authUser} = useAuthStore();

  return (
    <div >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/inbox" element={authUser ? <InboxPage /> : <Navigate to="/login" />} />

      </Routes>

    </div>
  )
}

export default App
