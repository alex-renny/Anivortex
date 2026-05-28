import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVideos } from '../context/VideoContext'

const CATEGORIES = ['Nature', 'Documentary', 'Science', 'Travel', 'Culture', 'Technology', 'Entertainment']

export default function AdminUpload() {
  const { addVideo } = useVideos()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    youtubeId: '',
    category: 'Nature',
    duration: '',
    views: '0',
    trending: false,
    tags: '',
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const ytIdFromUrl = (val) => {
    const m = val.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return m ? m[1] : val
  }

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const ytId = ytIdFromUrl(form.youtubeId)
    addVideo({
      ...form,
      youtubeId: ytId,
      thumbnail: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    })
    setSuccess(true)
    setLoading(false)
    setTimeout(() => navigate('/admin/videos'), 1500)
  }

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 24 }}>
      <label style={{
        display: 'block',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: '0.78rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        marginBottom: 10,
      }}>{label}</label>
      {children}
    </div>
  )

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    color: 'var(--text-primary)',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', animation: 'fadeInUp 0.5s ease' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--gold)', marginBottom: 8 }}>Video Added!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Redirecting to video manager...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
          Admin Panel
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 36 }}>
          Upload Video
        </h1>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '36px',
          animation: 'fadeInUp 0.5s ease',
        }}>
          <form onSubmit={handleSubmit}>
            <Field label="Video Title">
              <input
                type="text"
                required
                value={form.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="Enter an engaging title..."
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </Field>

            <Field label="YouTube Video ID or URL">
              <input
                type="text"
                required
                value={form.youtubeId}
                onChange={e => handleChange('youtubeId', e.target.value)}
                placeholder="dQw4w9WgXcQ or https://youtube.com/watch?v=..."
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              {form.youtubeId && (
                <div style={{ marginTop: 10, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img
                    src={`https://img.youtube.com/vi/${ytIdFromUrl(form.youtubeId)}/mqdefault.jpg`}
                    alt="Thumbnail preview"
                    style={{ width: '100%', maxHeight: 160, objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}
            </Field>

            <Field label="Description">
              <textarea
                required
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="Describe the video content..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={e => handleChange('category', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                >
                  {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#0f0f1e' }}>{c}</option>)}
                </select>
              </Field>

              <Field label="Duration (e.g. 12:34)">
                <input
                  type="text"
                  value={form.duration}
                  onChange={e => handleChange('duration', e.target.value)}
                  placeholder="00:00"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </Field>
            </div>

            <Field label="Tags (comma separated)">
              <input
                type="text"
                value={form.tags}
                onChange={e => handleChange('tags', e.target.value)}
                placeholder="nature, 4k, timelapse"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(230,180,60,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </Field>

            {/* Trending toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <button
                type="button"
                onClick={() => handleChange('trending', !form.trending)}
                style={{
                  width: 52, height: 28,
                  borderRadius: 14,
                  background: form.trending ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.3s',
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: 3, left: form.trending ? 26 : 3,
                  width: 22, height: 22,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.3s',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }} />
              </button>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.88rem' }}>Mark as Trending</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Shows in the trending section on the homepage</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Adding...' : '+ Add Video'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/videos')}
                className="btn-ghost"
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
