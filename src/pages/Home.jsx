import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useVideos } from '../context/VideoContext'
import VideoCard from '../components/VideoCard'
import VideoModal from '../components/VideoModal'
import Footer from '../components/Footer'

const isMobile = window.innerWidth <= 768

export default function Home() {
  const { trendingVideos, videos } = useVideos()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [licenseOpen, setLicenseOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const stats = [
    { label: 'Videos', value: videos.length + '+' },
    { label: 'Views', value: '12.5K' },
    { label: 'Subscribers', value: '39+' },
    { label: 'Categories', value: '8' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.18,
            filter: 'saturate(0.5)',
          }}
        >
          <source src="/mp_.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(230,180,60,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,2,7,0.3) 0%, rgba(2,2,7,0) 30%, rgba(2,2,7,0) 70%, rgba(2,2,7,1) 100%)',
        }} />

        {/* Animated grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(230,180,60,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,180,60,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }} />

        {/* Floating orbs */}
        <div style={{
          position: 'absolute',
          top: '20%', left: '10%',
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,180,60,0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%', right: '8%',
          width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,168,50,0.07) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 900,
          }}>
          

          <h1 style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            marginBottom: 24,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.15s',
          }}>
            <span style={{ display: 'block', color: '#e8e9f0' }}>AVR</span>
            <span style={{
              display: 'block',
              fontWeight: 900,
              letterSpacing: '0.08em',

              background: `
                linear-gradient(
                  90deg,
                  #f8b332,
                  #ffbf00,
                  #c49919,
                  #ff8a00,
                  #d2b406,
                  #ffcc70
                )
              `,
              backgroundSize: '300% auto',

              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',

              animation: 'premiumText 6s ease-in-out infinite',
            }}>
              ANIVORTEX
            </span>
          </h1>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: 600,
            margin: '0 auto 40px',
            opacity: visible ? 1 : 0,
            transition: 'all 0.8s ease 0.3s',
          }}>
            Handcrafted videos exploring nature, science, travel, and the wonders of our world. 
            Stream on YouTube or browse our curated collection below.
          </p>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.45s',
          }}>
            <Link to="/videos" className="btn-primary" style={{ fontSize: '0.9rem', padding: '14px 32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Watch Now
            </Link>
            <a
              href="https://www.youtube.com/@Avr_Anivortex"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ fontSize: '0.9rem', padding: '13px 30px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ff0000' }}>
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube Channel
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: visible ? 0.6 : 0,
          transition: 'opacity 1s ease 1s',
          animation: 'float 2.5s ease-in-out infinite',
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, var(--gold-dim), transparent)' }} />
        </div>
      </section>

      {/* CHANNEL DESCRIPTION / STATS */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 24,
          marginBottom: 80,
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center',
              padding: '32px 20px',
              borderRadius: 16,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              animation: `fadeInUp 0.6s ease ${i * 0.1}s both`,
            }}>
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '0.05em',
                color: 'var(--gold)',
                lineHeight: 1,
                marginBottom: 8,
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* About Channel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40,
          alignItems: 'center',
          marginBottom: 80,
        }}>
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 16,
            }}>About The Channel</div>
            <h2 style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '0.03em',
              lineHeight: 0.95,
              marginBottom: 24,
            }}>Where Visual<br /><span style={{ color: 'var(--gold)' }}>Stories</span><br />Come Alive</h2>
          </div>
          <div>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: 20,
              fontSize: '0.95rem',
            }}>
              🎧 Welcome to Avr Anivortex <br />
              A cinematic music universe where emotion meets atmosphere.
              This channel is dedicated to original soundscapes that blend
              cinematic intensity, deep emotion, and immersive storytelling through music.
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: 28,
              fontSize: '0.95rem',
            }}>
              Each video is carefully produced with cinematic quality and enriching storytelling. 
              Originally published on YouTube, our growing library spans everything from epic mountain timelapses 
              to deep-ocean expeditions. Browse freely — no login required.
            </p>
            <Link to="/videos" className="btn-primary">Explore All Videos</Link>
          </div>
        </div>
      </section>

      {/* TRENDING VIDEOS */}
      <section style={{
        padding: '0 24px 80px',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 40,
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 8,
            }}>🔥 Hot Right Now</div>
            <h2 style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              letterSpacing: '0.03em',
              lineHeight: 1,
            }}>Trending Videos</h2>
          </div>
          <Link to="/videos" style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'gap 0.2s',
          }}>
            View All <span>→</span>
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {trendingVideos.slice(0, 4).map((v, i) => (
            <div key={v.id} style={{ animation: `fadeInUp 0.6s ease ${i * 0.1}s both` }}>
              <VideoCard video={v} onClick={setSelectedVideo} />
            </div>
          ))}
        </div>
      </section>

      {/* LICENSE SECTION */}
      <section style={{
        padding: isMobile ? '0 16px 50px' : '0 24px 80px',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{
          borderRadius: 24,
          border: '1px solid var(--border-glow)',
          background: 'linear-gradient(135deg, rgba(230,180,60,0.05), rgba(200,168,50,0.02))',
          padding: isMobile ? '20px' : 'clamp(32px, 5vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: -40, right: -40,
            width: 200, height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230,180,60,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: isMobile ? 42 : 48,
              height: isMobile ? 42 : 48,             
              borderRadius: 12,
              background: 'var(--gold-dim)',
              border: '1px solid var(--border-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                marginBottom: 8,
              }}>License & Usage Agreement</h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: isMobile ? '0.82rem' : '0.9rem',
                lineHeight: 1.8,
                marginBottom: 20,
              }}>
                🎧 Free to use with credit
                Creators are welcome to use the music in videos, reels, and creative projects with proper credit.

                Every composition is crafted to express mood, silence, tension, and imagination through sound.
                This is not just music — it’s a journey through feeling.
              </p>

              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 12,
                padding: isMobile ? '16px' : '20px 24px',
                border: '1px solid var(--border)',
                marginBottom: 20,
              }}>
                {[
                  '✅ Personal viewing and streaming permitted',
                  '✅ Sharing links to this website',
                  '✅ Watching on YouTube via provided links',
                  '✅ Downloading or re-hosting videos without permission',
                  '✅ Commercial use or monetization of content',
                  '❌ Removing or altering videos',
                ].map((item, i) => (
                  <div key={i} style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.88rem',
                    color: item.startsWith('✅') ? 'var(--text-primary)' : 'var(--text-secondary)',
                    padding: '6px 0',
                    borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}>{item}</div>
                ))}
              </div>

              <button
                onClick={() => setLicenseOpen(!licenseOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--gold)',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {licenseOpen ? '▲' : '▼'} {licenseOpen ? 'Hide' : 'Read'} Full License Agreement
              </button>

              {licenseOpen && (
                <div style={{
                  marginTop: 20,
                  padding: isMobile ? '16px' : '24px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  animation: 'fadeInUp 0.3s ease',
                }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.8 }}>

                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 12 }}>Anivortex Content License Agreement</strong>

                    Last updated: {new Date().getFullYear()}<br /><br />

                    By accessing and using Anivortex ("the Website"), you agree to the following terms.
                    All content available on Anivortex, including videos, thumbnails, descriptions, and artwork, is provided under an open-use policy unless otherwise stated.<br /><br />

                    <strong style={{ color: 'var(--text-primary)' }}>Permitted Uses:</strong><br /> You may watch, download, copy, and share content freely. <br />
                    You may use content for personal, educational, and commercial purposes. <br />
                    You may reuse, modify, edit, remix, or redistribute content. <br />
                    You may include content in your own projects, videos, websites, or media. <br />
                    Attribution (credit) is appreciated but not required.<br /><br />

                    <strong style={{ color: 'var(--text-primary)' }}>Restrictions:</strong><br /> You may not use content in ways that violate applicable laws. <br />
                    You may not falsely claim an official partnership, endorsement, or representation of Anivortex.<br /><br />

                    <strong style={{ color: 'var(--text-primary)' }}>Disclaimer:</strong> Content is provided "as is" without warranties of any kind.
                    The creator is not responsible for any damages, misuse, or consequences arising from use of the content.<br /><br />
                    By using Anivortex content, users acknowledge and agree that the content is intended to be openly accessible and reusable without copyright restrictions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  )
}
