import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { VideoProvider } from './context/VideoContext'

import UserNav from './components/UserNav'
import AdminNav from './components/AdminNav'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Videos from './pages/Videos'
import About from './pages/About'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminUpload from './pages/AdminUpload'
import AdminVideos from './pages/AdminVideos'
import AdminUsers from './pages/AdminUsers'
import { useAuth } from './context/AuthContext'

function Layout() {
  const location = useLocation()
  const { admin } = useAuth()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {isAdminRoute && admin && location.pathname !== '/admin' ? (
        <AdminNav />
      ) : !isAdminRoute ? (
        <UserNav />
      ) : null}

      <div key={location.pathname} className="page-enter">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/upload" element={
            <ProtectedRoute><AdminUpload /></ProtectedRoute>
          } />
          <Route path="/admin/videos" element={
            <ProtectedRoute><AdminVideos /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute><AdminUsers /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <Layout />
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
