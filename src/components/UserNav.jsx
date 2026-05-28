import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function UserNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/videos', label: 'Videos' },
    { to: '/about', label: 'About' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 24px' : '20px 24px',
        background: scrolled ? 'rgba(2,2,7,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
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
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => {
            const isActive = location.pathname === l.to
            const isHovered = hoveredLink === l.to
            
            return (
              <Link 
                key={l.to} 
                to={l.to} 
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? '#e6b43c' : '#8a8898',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={() => setHoveredLink(l.to)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {l.label}
                
                {/* Active/Hover underline */}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: 2,
                  borderRadius: 2,
                  background: isActive 
                    ? '#e6b43c' 
                    : 'linear-gradient(90deg, #e6b43c, #ff8a00)',
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: isActive 
                    ? '100%' 
                    : isHovered 
                      ? '100%' 
                      : '0%',
                  boxShadow: isActive || isHovered 
                    ? '0 0 8px rgba(230,180,60,0.3)' 
                    : 'none',
                }} />
                
                {/* Glow effect on hover */}
                {isHovered && !isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: -2,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: 1,
                    background: 'radial-gradient(ellipse at center, rgba(230,180,60,0.4), transparent)',
                    filter: 'blur(2px)',
                  }} />
                )}
              </Link>
            )
          })}
          
          <Link 
            to="/admin" 
            style={{
              padding: '8px 20px',
              border: '1px solid rgba(230,180,60,0.3)',
              color: '#e6b43c',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: 50,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => { 
              e.target.style.background = 'rgba(230,180,60,0.1)'; 
              e.target.style.borderColor = '#e6b43c';
              e.target.style.boxShadow = '0 0 20px rgba(230,180,60,0.15)';
            }}
            onMouseLeave={e => { 
              e.target.style.background = 'transparent'; 
              e.target.style.borderColor = 'rgba(230,180,60,0.3)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Admin
            
            {/* Admin button underline on hover */}
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: '10%',
              width: '80%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, #e6b43c, transparent)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }} className="admin-underline" />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            padding: 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: 24,
              height: 2,
              background: menuOpen && i === 1 ? 'transparent' : '#f0eee8',
              borderRadius: 2,
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '70%', // covers only part of screen
          maxWidth: '280px',
          height: '100vh',
          background: 'rgba(2,2,7,0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,

          transform: menuOpen
            ? 'translateX(0)'
            : 'translateX(100%)',

          transition: 'transform .4s cubic-bezier(0.4,0,0.2,1)',

          borderLeft: '1px solid rgba(255,255,255,.08)',
          boxShadow: '-10px 0 40px rgba(0,0,0,.5)',
        }}>
        {links.map((l, i) => (
          <Link 
            key={l.to} 
            to={l.to} 
            style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '2rem',
              letterSpacing: '0.1em',
              color: location.pathname === l.to ? '#e6b43c' : '#f0eee8',
              textDecoration: 'none',
              position: 'relative',
              paddingBottom: '8px',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${0.1 + i * 0.07}s`,
            }}
          >
            {l.label}
            
            {/* Mobile underline for active link */}
            {location.pathname === l.to && (
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                width: '80%',
                height: 3,
                background: '#e6b43c',
                borderRadius: 2,
                opacity: menuOpen ? 1 : 0,
                transition: `opacity 0.3s ease ${0.3 + i * 0.07}s`,
              }} />
            )}
          </Link>
        ))}
        <Link 
          to="/admin" 
          style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '2rem',
            letterSpacing: '0.1em',
            color: '#e6b43c',
            textDecoration: 'none',
            position: 'relative',
            paddingBottom: '8px',
            opacity: menuOpen ? 1 : 0,
            transition: 'all 0.4s ease 0.4s',
          }}
        >
          Admin
          
          {/* Mobile underline for admin */}
          {location.pathname === '/admin' && (
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: '10%',
              width: '80%',
              height: 3,
              background: '#e6b43c',
              borderRadius: 2,
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity 0.3s ease 0.5s',
            }} />
          )}
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        
        /* Admin button underline on hover */
        a:hover .admin-underline {
          opacity: 1;
        }
      `}</style>
    </>
  )
}