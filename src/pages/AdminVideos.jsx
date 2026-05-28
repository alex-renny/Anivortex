import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useVideos } from '../context/VideoContext'

export default function AdminVideos() {
  const { videos, deleteVideo, updateVideo } = useVideos()
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleTrending = (v) => {
    updateVideo(v.id, { trending: !v.trending })
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
              Admin Panel
            </div>
            <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.03em', lineHeight: 1 }}>
              Manage Videos
            </h1>
          </div>
          <Link to="/admin/upload" className="btn-primary">+ Upload New</Link>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 400, marginBottom: 28 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px 12px 44px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 10, color: 'var(--text-primary)',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Video grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {filtered.map((v, i) => (
            <div key={v.id} style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              animation: `fadeInUp 0.4s ease ${Math.min(i, 4) * 0.07}s both`,
            }}>
              {/* Thumbnail */}
              <div style={{ position: 'relative', paddingTop: '50%', background: '#0a0a14' }}>
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  onError={e => { e.target.src = `https://picsum.photos/seed/${v.id}/400/200` }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)',
                }} />
                {v.trending && (
                  <div style={{
                    position: 'absolute', top: 10, left: 10,
                    background: 'linear-gradient(135deg, #e6b43c, #c8a832)',
                    color: '#000', fontFamily: 'Syne, sans-serif', fontWeight: 800,
                    fontSize: '0.6rem', padding: '2px 8px', borderRadius: 50,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>TRENDING</div>
                )}
              </div>

              <div style={{ padding: '16px' }}>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                  lineHeight: 1.4, marginBottom: 8,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{v.title}</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{
                    background: 'var(--gold-dim)', color: 'var(--gold)',
                    fontFamily: 'Syne, sans-serif', fontWeight: 600,
                    fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '3px 10px', borderRadius: 50,
                  }}>{v.category}</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem' }}>{v.views} views</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => toggleTrending(v)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: 8,
                      border: `1px solid ${v.trending ? 'rgba(230,180,60,0.3)' : 'var(--border)'}`,
                      background: v.trending ? 'var(--gold-dim)' : 'transparent',
                      color: v.trending ? 'var(--gold)' : 'var(--text-muted)',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >{v.trending ? '🔥 Trending' : 'Set Trending'}</button>

                  <a
                    href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >▶</a>

                  <button
                    onClick={() => setConfirmDelete(v.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: '1px solid rgba(230,60,60,0.3)',
                      background: 'rgba(230,60,60,0.08)',
                      color: '#e63c3c',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s',
                    }}
                  >🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎬</div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>No videos found</p>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{
            background: 'var(--bg-card)', border: '1px solid rgba(230,60,60,0.3)',
            borderRadius: 20, padding: 36, maxWidth: 380, width: '100%',
            animation: 'fadeInUp 0.3s ease',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16, textAlign: 'center' }}>⚠️</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', textAlign: 'center', marginBottom: 12 }}>Delete Video?</h3>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.88rem', marginBottom: 28 }}>
              This action cannot be undone. The video will be removed from your site.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => { deleteVideo(confirmDelete); setConfirmDelete(null) }}
                style={{
                  flex: 1, padding: '12px', background: '#e63c3c',
                  color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700,
                  fontSize: '0.85rem', borderRadius: 10, border: 'none', cursor: 'pointer',
                }}
              >Delete</button>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  flex: 1, padding: '12px', background: 'transparent',
                  color: 'var(--text-secondary)', fontFamily: 'Syne, sans-serif',
                  fontWeight: 700, fontSize: '0.85rem', borderRadius: 10,
                  border: '1px solid var(--border)', cursor: 'pointer',
                }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
