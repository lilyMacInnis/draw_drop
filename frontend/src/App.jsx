import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { authStore } from './store/authStore'

const App = () => {
  const {authUser} = authStore();

  return (
    <div >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inbox" element={authUser ? <InboxPage /> : <Navigate to="/login" />} />

      </Routes>

    </div>
  )
}

export default App
