import React from 'react'
import { Link } from 'react-router-dom'
import { useVideos } from '../context/VideoContext'
import { useAuth } from '../context/AuthContext'

// const MOCK_USERS = [
//   { id: 1, name: 'Anonymous User', visits: 142, lastSeen: '2 min ago', country: 'IN', status: 'active' },
//   { id: 2, name: 'Visitor #2847', visits: 89, lastSeen: '8 min ago', country: 'US', status: 'active' },
//   { id: 3, name: 'Visitor #1023', visits: 34, lastSeen: '1 hr ago', country: 'UK', status: 'idle' },
//   { id: 4, name: 'Visitor #5671', visits: 210, lastSeen: '3 hrs ago', country: 'DE', status: 'offline' },
//   { id: 5, name: 'Visitor #9034', visits: 17, lastSeen: '5 hrs ago', country: 'JP', status: 'offline' },
// ]

export default function AdminDashboard() {
  const { videos } = useVideos()
  const { logout } = useAuth()

  const stats = [
    { label: 'Total Videos', value: videos.length, icon: '🎬', color: '#e6b43c' },
    { label: 'Trending', value: videos.filter(v => v.trending).length, icon: '🔥', color: '#ff6b35' },
    // { label: 'Active Users', value: MOCK_USERS.filter(u => u.status === 'active').length, icon: '👥', color: '#35d4a0' },
    { label: 'Total Views', value: '12.5K+', icon: '👁', color: '#a535d4' },
  ]

  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            Admin Portal
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.03em', lineHeight: 1 }}>
            Dashboard
          </h1>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
          marginBottom: 40,
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: '28px 24px',
              borderRadius: 16,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              animation: `fadeInUp 0.5s ease ${i * 0.08}s both`,
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2.5rem', letterSpacing: '0.05em', color: s.color, lineHeight: 1, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
          <Link to="/admin/upload" className="btn-primary" style={{ fontSize: '0.85rem' }}>
            + Upload Video
          </Link>
          <Link to="/admin/videos" className="btn-ghost" style={{ fontSize: '0.85rem' }}>
            Manage Videos
          </Link>
        </div>

        {/* Recent Videos */}
        <div style={{
          borderRadius: 20,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: '28px',
          marginBottom: 24,
        }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: 20 }}>Recent Videos</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr>
                  {['Title', 'Category', 'Trending', 'Date'].map(h => (
                    <th key={h} style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      textAlign: 'left',
                      padding: '0 16px 12px 0',
                      borderBottom: '1px solid var(--border)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {videos.slice(0, 5).map((v, i) => (
                  <tr key={v.id} style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '14px 16px 14px 0' }}>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.88rem', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {v.title}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px 14px 0' }}>
                      <span style={{ background: 'var(--gold-dim)', color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: 50, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {v.category}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px 14px 0' }}>
                      <span style={{ color: v.trending ? '#35d4a0' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {v.trending ? '✅' : '—'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px 14px 0', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }}>{v.uploadedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
