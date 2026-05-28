import React from 'react'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>About</div>
        <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(3rem, 8vw, 5rem)', letterSpacing: '0.03em', lineHeight: 0.95, marginBottom: 40 }}>
          Our Story
        </h1>

        <div style={{
          width: '100%',
          height: 300,
          borderRadius: 20,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          marginBottom: 40,
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(230,180,60,0.15) 0%, transparent 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '5rem',
              letterSpacing: '0.1em',
              color: 'rgba(230,180,60,0.3)',
            }}>Anivortex</div>
          </div>
        </div>

        {[
          {
            title: 'Who We Are',
            body: 'A cinematic music universe where emotion meets atmosphere.This channel is dedicated to original soundscapes that blend cinematic intensity, deep emotion, and immersive storytelling through music.✨ Here you will experience:🎵 Emotional & Atmospheric Soundtracks🌌 Dark and Dreamlike Ambience🎌 Anime-Inspired Musical Worlds🔥 Powerful Cinematic Energy',
          },
          {
            title: 'Our Mission',
            body: '🎧 Free to use with credit Creators are welcome to use the music in videos, reels, and creative projects with proper credit.',
          },
          {
            title: 'Our Content',
            body: 'Every composition is crafted to express mood, silence, tension, and imagination through sound.This is not just music — it’s a journey through feeling.',
          },
        ].map((section, i) => (
          <div key={i} style={{
            marginBottom: 40,
            padding: '32px',
            borderRadius: 16,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            animation: `fadeInUp 0.6s ease ${i * 0.1}s both`,
          }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--gold)', marginBottom: 16 }}>{section.title}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{section.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}
