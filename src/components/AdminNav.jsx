import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminNav() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/videos', label: 'Videos' },
    // { to: '/admin/users', label: 'Users' },
    { to: '/admin/upload', label: 'Upload' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: 'rgba(10,5,0,0.97)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(230,180,60,0.2)',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none"
          }}
        >
      
          <img
          src="/logo.jpeg"
          alt="AniVortex Logo"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "8px",
            objectFit: "cover"
          }}
        />
      
        <span
          style={{
            fontFamily: "Bebas Neue, cursive",
            fontSize: "1.6rem",
            letterSpacing: "0.08em",
            color: "#f0eee8"
          }}
        >
          Ani
          <span style={{ color: "#e6b43c" }}>
            Vortex
          </span>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#e6b43c',
            textTransform: 'uppercase',
          }}>Admin Panel</div>
        </span>
        
      </Link>


      {/* Desktop */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="admin-desktop-nav">
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '0.82rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: location.pathname === l.to ? '#e6b43c' : '#8a8898',
            transition: 'color 0.2s',
            padding: '4px 0',
            borderBottom: location.pathname === l.to ? '2px solid #e6b43c' : '2px solid transparent',
          }}>{l.label}</Link>
        ))}
        <button onClick={handleLogout} style={{
          padding: '8px 20px',
          background: 'rgba(230,60,60,0.1)',
          border: '1px solid rgba(230,60,60,0.3)',
          color: '#e63c3c',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          borderRadius: 50,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.target.style.background = 'rgba(230,60,60,0.2)'}
        onMouseLeave={e => e.target.style.background = 'rgba(230,60,60,0.1)'}
        >Logout</button>
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="admin-hamburger"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: 5,
          padding: 8,
        }}
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: 22, height: 2,
            background: '#e6b43c', borderRadius: 2,
            transition: 'all 0.3s',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
              : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)'
              : 'none',
          }} />
        ))}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%', left: 0, right: 0,
          background: 'rgba(10,5,0,0.99)',
          borderBottom: '1px solid rgba(230,180,60,0.2)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: location.pathname === l.to ? '#e6b43c' : '#f0eee8',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{l.label}</Link>
          ))}
          <button onClick={handleLogout} style={{
            color: '#e63c3c',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            textAlign: 'left',
            padding: '8px 0',
            letterSpacing: '0.1em',
          }}>Logout</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-desktop-nav { display: none !important; }
          .admin-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
