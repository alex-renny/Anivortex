import React, { useState, useEffect } from 'react'

const generateUsers = () => {
  const countries = ['IN', 'US', 'UK', 'DE', 'JP', 'BR', 'FR', 'AU', 'CA', 'SG']
  const statuses = ['active', 'active', 'active', 'idle', 'idle', 'offline', 'offline', 'offline']
  const pages = ['Home', 'Videos', 'Video Player', 'About']
  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Visitor #${(Math.floor(Math.random() * 9000) + 1000)}`,
    country: countries[Math.floor(Math.random() * countries.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    visits: Math.floor(Math.random() * 300) + 1,
    currentPage: pages[Math.floor(Math.random() * pages.length)],
    duration: `${Math.floor(Math.random() * 60)}m`,
    lastSeen: ['just now', '2 min ago', '5 min ago', '15 min ago', '1 hr ago', '3 hrs ago'][Math.floor(Math.random() * 6)],
    device: ['Mobile', 'Desktop', 'Tablet'][Math.floor(Math.random() * 3)],
  }))
}

export default function AdminUsers() {
  const [users] = useState(generateUsers)
  const [filter, setFilter] = useState('all')
  const [online, setOnline] = useState(0)

  useEffect(() => {
    setOnline(users.filter(u => u.status === 'active').length)
  }, [users])

  const filtered = filter === 'all' ? users : users.filter(u => u.status === filter)

  const statusColor = { active: '#35d4a0', idle: '#e6b43c', offline: '#4a4a5e' }
  const statusBg = { active: 'rgba(53,212,160,0.1)', idle: 'rgba(230,180,60,0.1)', offline: 'rgba(74,74,94,0.1)' }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
          Admin Panel
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 36 }}>
          User Activity
        </h1>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Users', value: users.length, color: '#f0eee8' },
            { label: 'Online Now', value: users.filter(u => u.status === 'active').length, color: '#35d4a0' },
            { label: 'Idle', value: users.filter(u => u.status === 'idle').length, color: '#e6b43c' },
            { label: 'Offline', value: users.filter(u => u.status === 'offline').length, color: '#4a4a5e' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '20px', borderRadius: 14,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              animation: `fadeInUp 0.5s ease ${i * 0.08}s both`,
            }}>
              <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {['all', 'active', 'idle', 'offline'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 18px',
                borderRadius: 50,
                border: `1px solid ${filter === f ? (f === 'all' ? 'var(--gold)' : statusColor[f] || 'var(--gold)') : 'var(--border)'}`,
                background: filter === f ? (f === 'all' ? 'var(--gold-dim)' : statusBg[f] || 'var(--gold-dim)') : 'transparent',
                color: filter === f ? (f === 'all' ? 'var(--gold)' : statusColor[f] || 'var(--gold)') : 'var(--text-secondary)',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >{f}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['User', 'Status', 'Country', 'Device', 'Current Page', 'Visits', 'Last Seen'].map(h => (
                    <th key={h} style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.7rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)',
                      textAlign: 'left', padding: '16px 16px',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem' }}>{u.name}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: statusBg[u.status],
                        color: statusColor[u.status],
                        fontFamily: 'Syne, sans-serif', fontWeight: 700,
                        fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '3px 10px', borderRadius: 50,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor[u.status] }} />
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>{u.country}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }}>{u.device}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }}>{u.currentPage}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>{u.visits}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }}>{u.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', marginTop: 16, textAlign: 'center' }}>
          Showing {filtered.length} users · Data refreshes on page load
        </p>
      </div>
    </div>
  )
}
