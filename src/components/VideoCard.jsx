import React, { useState } from 'react'

export default function VideoCard({ video, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const thumbnail = imgError
    ? `https://picsum.photos/seed/${video.id}/640/360`  
    : video.thumbnail

  return (
    <div
      onClick={() => onClick && onClick(video)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'rgba(230,180,60,0.25)' : 'var(--border)'}`,
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(230,180,60,0.15)' : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden', background: '#0a0a14' }}>
        <img
          src={thumbnail}
          alt={video.title}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        {/* Duration Badge */}
        <div style={{
          position: 'absolute',
          bottom: 10, right: 10,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '0.75rem',
          padding: '3px 8px',
          borderRadius: 4,
          letterSpacing: '0.05em',
        }}>{video.duration}</div>

        {/* Trending Badge */}
        {video.trending && (
          <div style={{
            position: 'absolute',
            top: 10, left: 10,
            background: 'linear-gradient(135deg, #e6b43c, #c8a832)',
            color: '#000',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '0.65rem',
            padding: '3px 10px',
            borderRadius: 50,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>TRENDING</div>
        )}

        {/* Play overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.4)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            width: 56, height: 56,
            borderRadius: '50%',
            background: 'rgba(230,180,60,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(230,180,60,0.5)',
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.3s',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon points="6,3 20,12 6,21" fill="#000" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '0.95rem',
          lineHeight: 1.4,
          marginBottom: 8,
          color: 'var(--text-primary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{video.title}</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            background: 'var(--gold-dim)',
            color: 'var(--gold)',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '3px 10px',
            borderRadius: 50,
          }}>{video.category}</span>

          <span style={{
            color: 'var(--text-muted)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.8rem',
          }}>{video.views} views</span>
        </div>
      </div>
    </div>
  )
}
