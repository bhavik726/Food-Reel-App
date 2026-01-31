import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home.css';

const Home = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Sample food videos data - replace with API call
  const foodVideos = [
    {
      id: 1,
      videoUrl: 'https://example.com/video1.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/FF6B6B/FFFFFF?text=Delicious+Pizza',
      title: 'Authentic Italian Pizza',
      description: 'Handcrafted pizza with fresh mozzarella, basil, and our secret tomato sauce. Made in a wood-fired oven for that perfect crispy crust.',
      partnerId: 'partner1',
      partnerName: 'Pizza Paradise'
    },
    {
      id: 2,
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/4ECDC4/FFFFFF?text=Tasty+Burger',
      title: 'Gourmet Beef Burger',
      description: 'Juicy beef patty with caramelized onions, aged cheddar, and our signature sauce on a brioche bun.',
      partnerId: 'partner2',
      partnerName: 'Burger Hub'
    },
    {
      id: 3,
      videoUrl: 'https://example.com/video3.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/FFE66D/333333?text=Fresh+Sushi',
      title: 'Premium Sushi Platter',
      description: 'Fresh salmon, tuna, and yellowtail sushi with wasabi and pickled ginger. Prepared by our master chef.',
      partnerId: 'partner3',
      partnerName: 'Sushi Master'
    },
    {
      id: 4,
      videoUrl: 'https://example.com/video4.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/95E1D3/333333?text=Spicy+Ramen',
      title: 'Spicy Miso Ramen',
      description: 'Rich miso broth with tender pork belly, soft-boiled egg, and fresh vegetables. Customize your spice level!',
      partnerId: 'partner4',
      partnerName: 'Ramen Kingdom'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideo && newIndex >= 0 && newIndex < foodVideos.length) {
        setCurrentVideo(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentVideo, foodVideos.length]);

  const handleVisitStore = (partnerId, partnerName) => {
    navigate(`/store/${partnerId}`, { state: { partnerName } });
  };

  return (
    <div className="home-container" ref={containerRef}>
      {foodVideos.map((video) => (
        <div key={video.id} className="video-reel">
          {/* Video/Image Background */}
          <div className="video-background">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="video-placeholder"
            />
            {/* Replace with actual video when available */}
            {/* <video 
              src={video.videoUrl}
              className="video-player"
              loop
              muted
              autoPlay={index === currentVideo}
            /> */}
          </div>

          {/* Overlay Content */}
          <div className="video-overlay">
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <button 
                className="visit-store-btn"
                onClick={() => handleVisitStore(video.partnerId, video.partnerName)}
              >
                <span className="store-icon">🏪</span>
                Visit Store
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
