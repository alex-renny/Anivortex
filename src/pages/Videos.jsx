import React, { useState, useMemo } from 'react'
import { useVideos } from '../context/VideoContext'
import VideoCard from '../components/VideoCard'
import VideoModal from '../components/VideoModal'
import Footer from '../components/Footer'

const CATEGORIES = ['All', 'Nature', 'Documentary', 'Science', 'Travel', 'Culture', 'Technology']

export default function Videos() {
  const { videos } = useVideos()
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')

  const filtered = useMemo(() => {
    let v = [...videos]
    if (category !== 'All') v = v.filter(x => x.category === category)
    if (search) v = v.filter(x =>
      x.title.toLowerCase().includes(search.toLowerCase()) ||
      x.description.toLowerCase().includes(search.toLowerCase())
    )
    if (sort === 'newest') v.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    if (sort === 'views') v.sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
    if (sort === 'trending') v = [...v.filter(x => x.trending), ...v.filter(x => !x.trending)]
    return v
  }, [videos, category, search, sort])

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80 }}>
      {/* Header */}
      <div style={{
        padding: '60px 24px 40px',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <div style={{ marginBottom: 8, fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          Complete Collection
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '0.03em', lineHeight: 0.95, marginBottom: 20 }}>
          All Videos
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 500 }}>
          Browse our complete library of {videos.length} premium videos.
        </p>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 24px 40px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 28, maxWidth: 480 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              color: 'var(--text-primary)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.4)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '8px 20px',
                borderRadius: 50,
                border: `1px solid ${category === c ? 'var(--gold)' : 'var(--border)'}`,
                background: category === c ? 'var(--gold-dim)' : 'transparent',
                color: category === c ? 'var(--gold)' : 'var(--text-secondary)',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >{c}</button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sort:</span>
          {[
            { value: 'newest', label: 'Newest' },
            { value: 'views', label: 'Most Viewed' },
            { value: 'trending', label: 'Trending' },
          ].map(s => (
            <button
              key={s.value}
              onClick={() => setSort(s.value)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: sort === s.value ? 'rgba(230,180,60,0.15)' : 'transparent',
                color: sort === s.value ? 'var(--gold)' : 'var(--text-muted)',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >{s.label}</button>
          ))}
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>
            {filtered.length} video{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '0 24px', maxWidth: 1200, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎬</div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>No videos found</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
            marginBottom: 80,
          }}>
            {filtered.map((v, i) => (
              <div key={v.id} style={{ animation: `fadeInUp 0.5s ease ${Math.min(i, 5) * 0.07}s both` }}>
                <VideoCard video={v} onClick={setSelected} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {selected && <VideoModal video={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
