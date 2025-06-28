import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import InboxPage from './pages/InboxPage'
import SearchPage from './pages/SearchPage'
import SendPage from './pages/SendPage'
import ProfilePage from './pages/ProfilePage'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const {authUser} = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");

    if(selectedTheme){
      document.documentElement.classList = selectedTheme;
    } else if(window.matchMedia("(prefers-color-theme: dark)").matches) {
      document.documentElement.classList = "dark";
    } else{
      document.documentElement.classList = "light";
    }
  }, [theme]);

  return (
    <div >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/send/:id" element={<SendPage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/inbox" element={authUser ? <InboxPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

      </Routes>

    </div>
  )
}

export default App
