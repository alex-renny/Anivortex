import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { login, admin } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (admin) navigate('/admin/dashboard')
  }, [admin, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    const ok = login(username, password)
    if (ok) {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,180,60,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(230,180,60,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(230,180,60,0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: 420,
        position: 'relative',
        animation: 'fadeInUp 0.6s ease',
      }}>
        {/* Card */}
        <div style={{
          background: 'rgba(15,15,30,0.9)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(230,180,60,0.2)',
          borderRadius: 24,
          padding: 'clamp(32px, 5vw, 48px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(230,180,60,0.05)',
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
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
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', letterSpacing: '0.08em' }}>
              Ani<span style={{ color: '#e6b43c' }}>Vortex</span>
            </div>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginTop: 4,
            }}>Admin Portal</div>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '1.3rem',
            marginBottom: 6,
            textAlign: 'center',
          }}>Welcome Back</h2>
          <p style={{
            color: 'var(--text-muted)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.88rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>Sign in to manage your content</p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: 8,
              }}>User-mail</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${error ? 'rgba(230,60,60,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10,
                  color: 'var(--text-primary)',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                onBlur={e => e.target.style.borderColor = error ? 'rgba(230,60,60,0.5)' : 'rgba(255,255,255,0.08)'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: 8,
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${error ? 'rgba(230,60,60,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10,
                    color: 'var(--text-primary)',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                  onBlur={e => e.target.style.borderColor = error ? 'rgba(230,60,60,0.5)' : 'rgba(255,255,255,0.08)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(230,60,60,0.1)',
                border: '1px solid rgba(230,60,60,0.3)',
                borderRadius: 10,
                color: '#e63c3c',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                marginBottom: 20,
                animation: 'fadeIn 0.3s ease',
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? 'rgba(230,180,60,0.5)' : 'linear-gradient(135deg, #e6b43c, #c8a832)',
                color: '#000',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 10,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: loading ? 'none' : '0 0 30px rgba(230,180,60,0.3)',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >← Back to Website</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
