import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, #050510 100%)',
      borderTop: '1px solid var(--border)',
      padding: '60px 24px 30px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 50,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '2.5rem',
              letterSpacing: '0.08em',
              marginBottom: 12,
            }}>Ani<span style={{ color: 'var(--gold)' }}>Vortex</span></div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              maxWidth: 240,
            }}>
              Premium curated video content for curious minds. Explore, discover, and download.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[
                { name: 'YT', url: 'https://www.youtube.com/@Avr_Anivortex' },
                { name: 'IG', url: 'https://www.instagram.com/avr_xplode?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                // { name: 'X', url: 'https://x.com/yourusername' }
              ].map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize:14
                  }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
            }}>Navigate</h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/videos', label: 'All Videos' },
              { to: '/about', label: 'About' },
              { to: '/admin', label: 'Admin Portal' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block',
                color: 'var(--text-secondary)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.88rem',
                marginBottom: 12,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
            }}>Categories</h4>
            {['Nature', 'Documentary', 'Science', 'Travel', 'Culture', 'Technology'].map(c => (
              <div key={c} style={{
                color: 'var(--text-secondary)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.88rem',
                marginBottom: 12,
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{c}</div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
            }}>Legal</h4>
            {[
              { to: '/license', label: 'License Agreement' },
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block',
                color: 'var(--text-secondary)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.88rem',
                marginBottom: 12,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
          marginBottom: 30,
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{
            color: 'var(--text-muted)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.82rem',
          }}>
             {year} Anivortex.  Content available on YouTube.
          </p>
          
        </div>
      </div>
    </footer>
  )
}
