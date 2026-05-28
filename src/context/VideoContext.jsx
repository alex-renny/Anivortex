import React, { createContext, useContext, useState } from 'react'

const VideoContext = createContext(null)

// Sample initial videos - admin can add more
const INITIAL_VIDEOS = [
  {
    id: '1',
    title: 'Golden Gaze',
    description: 'A breathtaking timelapse of sunrise over the Himalayas captured in stunning 4K resolution.',
    youtubeId: 'T50Y7tr_wa4',
    thumbnail: 'https://i.ytimg.com/vi/T50Y7tr_wa4/hqdefault.jpg',
    views: '2.4M',
    duration: '8:32',
    category: 'Nature',
    trending: true,
    uploadedAt: '2024-12-10',
    tags: ['nature', '4k', 'timelapse'],
  },
  {
    id: '2',
    title: 'Aana Chandham (Instrumental) ',
    description: 'Explore the mesmerizing beauty of city lights at night across major metropolitan areas.',
    youtubeId: 'acJ8EjKvyOE',
    thumbnail: 'https://img.youtube.com/vi/acJ8EjKvyOE/maxresdefault.jpg',
    views: '1.1M',
    duration: '14:20',
    category: 'Documentary',
    trending: true,
    uploadedAt: '2024-12-05',
    tags: ['city', 'documentary', 'night'],
  },
  {
    id: '3',
    title: 'Spectre',
    description: 'Journey into the depths of the ocean to discover creatures never seen before.',
    youtubeId: 'w48xu58l-Vs',
    thumbnail: 'https://img.youtube.com/vi/w48xu58l-Vs/maxresdefault.jpg',
    views: '3.7M',
    duration: '22:15',
    category: 'Science',
    trending: true,
    uploadedAt: '2024-11-28',
    tags: ['ocean', 'science', 'nature'],
  },
  {
    id: '4',
    title: 'After Hours ',
    description: 'A culinary journey through the streets of Tokyo, Istanbul, Mexico City and more.',
    youtubeId: 'LuzO1JxzjxQ',
    thumbnail: 'https://img.youtube.com/vi/LuzO1JxzjxQ/maxresdefault.jpg',
    views: '890K',
    duration: '45:00',
    category: 'Travel',
    trending: false,
    uploadedAt: '2024-11-15',
    tags: ['food', 'travel', 'culture'],
  },
  {
    id: '5',
    title: 'The Last Airship (Instrumental) ',
    description: 'From pyramids to skyscrapers — a visual tour through humanity\'s greatest structures.',
    youtubeId: 'JTFyxv6GsKQ',
    thumbnail: 'https://img.youtube.com/vi/JTFyxv6GsKQ/maxresdefault.jpg',
    views: '560K',
    duration: '18:44',
    category: 'Culture',
    trending: false,
    uploadedAt: '2024-10-30',
    tags: ['architecture', 'history', 'culture'],
  },
  {
    id: '6',
    title: 'Manassinte Vazhi',
    description: 'Witness the magical dance of northern lights captured in unprecedented 8K clarity.',
    youtubeId: 'QlVX7meBbKk',
    thumbnail: 'https://img.youtube.com/vi/QlVX7meBbKk/maxresdefault.jpg',
    views: '4.2M',
    duration: '11:08',
    category: 'Nature',
    trending: true,
    uploadedAt: '2024-12-01',
    tags: ['aurora', 'nature', '8k'],
  },
  {
    id: '7',
    title: 'Metamorphosis (Instrumental)',
    description: 'Witness the magical dance of northern lights captured in unprecedented 8K clarity.',
    youtubeId: 'WXCoGQdxcYU',
    thumbnail: 'https://i.ytimg.com/vi/WXCoGQdxcYU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBqS-6gKjXlr2rbEmXqqnfyQHqXTA',
    views: '4.2M',
    duration: '11:08',
    category: 'Nature',
    trending: true,
    uploadedAt: '2024-12-01',
    tags: ['aurora', 'nature', '8k'],
  },
  
]

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState(() => {
    const stored = localStorage.getItem('mytube_videos')
    return stored ? JSON.parse(stored) : INITIAL_VIDEOS
  })

  const addVideo = (video) => {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString().split('T')[0],
      views: '0',
    }
    const updated = [newVideo, ...videos]
    setVideos(updated)
    localStorage.setItem('mytube_videos', JSON.stringify(updated))
  }

  const deleteVideo = (id) => {
    const updated = videos.filter(v => v.id !== id)
    setVideos(updated)
    localStorage.setItem('mytube_videos', JSON.stringify(updated))
  }

  const updateVideo = (id, data) => {
    const updated = videos.map(v => v.id === id ? { ...v, ...data } : v)
    setVideos(updated)
    localStorage.setItem('mytube_videos', JSON.stringify(updated))
  }

  const trendingVideos = videos.filter(v => v.trending)

  return (
    <VideoContext.Provider value={{ videos, trendingVideos, addVideo, deleteVideo, updateVideo }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideos = () => useContext(VideoContext)
