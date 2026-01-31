import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home.css';
import axios from 'axios';

const Home = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [foodVideos, setFoodVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [likedFoods, setLikedFoods] = useState({});
  const [savedFoods, setSavedFoods] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [saveCounts, setSaveCounts] = useState({});
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Load user's likes and saves
  useEffect(() => {
    axios
      .get('/api/likes', { withCredentials: true })
      .then((response) => {
        const liked = {};
        response.data.likedFoodIds.forEach((id) => {
          liked[id] = true;
        });
        setLikedFoods(liked);
      })
      .catch((err) => {});

    axios
      .get('/api/saved', { withCredentials: true })
      .then((response) => {
        const saved = {};
        response.data.savedFoods.forEach((food) => {
          saved[food.id] = true;
        });
        setSavedFoods(saved);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError('');

    axios
      .get('/api/food', { withCredentials: true })
      .then((response) => {
        const items = response?.data?.fooditems || [];
        const mapped = items.map((item) => ({
          id: item.id,
          videoUrl: item.video,
          title: item.name || 'Untitled dish',
          description: item.description || 'Freshly prepared meal from our partner.',
          partnerId: item.food_partner_id,
          partnerName: item.food_partners?.name || 'Food Partner',
          partnerAddress: item.food_partners?.address || ''
        }));

        if (!isMounted) return;
        setFoodVideos(mapped);
        
        // Initialize counts (you can fetch these from backend if needed)
        const counts = {};
        const saves = {};
        mapped.forEach((video) => {
          counts[video.id] = 0;
          saves[video.id] = 0;
        });
        setLikeCounts(counts);
        setSaveCounts(saves);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.response?.data?.message || 'Failed to load videos.');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
    navigate(`/profile/${partnerId}`, { state: { partnerName } });
  };

  const handleLike = async (foodId) => {
    try {
      if (likedFoods[foodId]) {
        await axios.delete(`/api/foods/${foodId}/like`, { withCredentials: true });
        setLikedFoods((prev) => ({ ...prev, [foodId]: false }));
        setLikeCounts((prev) => ({ ...prev, [foodId]: Math.max(0, (prev[foodId] || 0) - 1) }));
      } else {
        const response = await axios.post(`/api/foods/${foodId}/like`, {}, { withCredentials: true });
        setLikedFoods((prev) => ({ ...prev, [foodId]: true }));
        setLikeCounts((prev) => ({ ...prev, [foodId]: response.data.likeCount || (prev[foodId] || 0) + 1 }));
      }
    } catch (err) {}
  };

  const handleSave = async (foodId) => {
    try {
      if (savedFoods[foodId]) {
        await axios.delete(`/api/foods/${foodId}/save`, { withCredentials: true });
        setSavedFoods((prev) => ({ ...prev, [foodId]: false }));
        setSaveCounts((prev) => ({ ...prev, [foodId]: Math.max(0, (prev[foodId] || 0) - 1) }));
      } else {
        const response = await axios.post(`/api/foods/${foodId}/save`, {}, { withCredentials: true });
        setSavedFoods((prev) => ({ ...prev, [foodId]: true }));
        setSaveCounts((prev) => ({ ...prev, [foodId]: response.data.saveCount || (prev[foodId] || 0) + 1 }));
      }
    } catch (err) {}
  };

  if (isLoading) {
    return <div className="home-state">Loading food reels...</div>;
  }

  if (error) {
    return <div className="home-state error">{error}</div>;
  }

  if (!foodVideos.length) {
    return <div className="home-state">No videos yet. Check back soon!</div>;
  }

  return (
    <div className="home-container" ref={containerRef}>
      {foodVideos.map((video, index) => (
        <div key={video.id} className="video-reel">
          <div className="video-background">
            <video
              src={video.videoUrl}
              className="video-player"
              loop
              muted
              playsInline
              autoPlay={index === currentVideo}
            />
          </div>

          <div className="video-overlay">
            <div className="video-actions">
              <button
                className={`action-btn like-btn ${likedFoods[video.id] ? 'active' : ''}`}
                onClick={() => handleLike(video.id)}
                title="Like"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={likedFoods[video.id] ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {likeCounts[video.id] > 0 && <span className="count">{likeCounts[video.id]}</span>}
              </button>

              <button
                className={`action-btn save-btn ${savedFoods[video.id] ? 'active' : ''}`}
                onClick={() => handleSave(video.id)}
                title="Save"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={savedFoods[video.id] ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                </svg>
                {saveCounts[video.id] > 0 && <span className="count">{saveCounts[video.id]}</span>}
              </button>
            </div>

            <div className="video-info">
              <div className="video-partner">{video.partnerName}</div>
              {video.partnerAddress && (
                <div className="video-partner-sub">{video.partnerAddress}</div>
              )}
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
