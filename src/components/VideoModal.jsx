import React, { useEffect } from 'react'

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    // Scroll lock removed
    // document.body.style.overflow='hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      // document.body.style.overflow=''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  if (!video) return null

  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 900,
          borderRadius: 20,
          overflow: 'hidden',
          background: 'var(--bg-card)',
          border: '1px solid rgba(230,180,60,0.2)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          animation: 'fadeInUp 0.4s ease',
        }}
      >
        {/* Video embed */}
        <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
          <iframe
            src={embedUrl}
            title={video.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Details */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '1.2rem',
                marginBottom: 8,
                lineHeight: 1.3,
              }}>{video.title}</h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
              }}>{video.description}</p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  background: '#ff0000',
                  color: '#fff',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  borderRadius: 50,
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 002.42 7.2 26.9 26.9 0 002 12a26.9 26.9 0 00.42 4.81 2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 001.76-1.77A26.9 26.9 0 0022 12a26.9 26.9 0 00-.42-4.81zM10 15V9l5.2 3L10 15z"/>                </svg>
                YouTube
              </a>

              <button
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  borderRadius: 50,
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >Close</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <span style={{
              background: 'var(--gold-dim)',
              color: 'var(--gold)',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: 50,
            }}>{video.category}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              {video.views} views
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              {video.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
