import React, { useEffect, useState } from 'react'
import '../../styles/home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Saved = () => {
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        setIsLoading(true)
        setError('')

        axios.get("/api/saved", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    id: item.id,
                    videoUrl: item.video,
                    title: item.name || 'Untitled dish',
                    description: item.description || 'Freshly prepared meal from our partner.',
                    partnerId: item.food_partner_id,
                    partnerName: item.food_partners?.name || 'Food Partner',
                    partnerAddress: item.food_partners?.address || ''
                }))
                if (!isMounted) return
                setVideos(savedFoods)
            })
            .catch(err => {
                if (!isMounted) return
                setError(err.response?.data?.message || 'Failed to load saved videos.')
            })
            .finally(() => {
                if (!isMounted) return
                setIsLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [])

    const handleRemoveSave = async (foodId) => {
        try {
            await axios.delete(`/api/foods/${foodId}/save`, { withCredentials: true })
            setVideos((prev) => prev.filter((v) => v.id !== foodId))
        } catch (err) {}
    }

    const handleVisitStore = (partnerId, partnerName) => {
        navigate(`/profile/${partnerId}`, { state: { partnerName } })
    }

    if (isLoading) {
        return <div className="home-state">Loading saved videos...</div>
    }

    if (error) {
        return <div className="home-state error">{error}</div>
    }

    if (!videos.length) {
        return <div className="home-state">No saved videos yet. Start saving your favorites!</div>
    }

    return (
        <div className="saved-grid">
            {videos.map((video) => (
                <div key={video.id} className="saved-card">
                    <div className="saved-video-wrapper">
                        <video
                            src={video.videoUrl}
                            className="saved-video"
                            controls
                            playsInline
                        />
                        <button
                            className="remove-save-btn"
                            onClick={() => handleRemoveSave(video.id)}
                            title="Remove from saved"
                        >
                            ×
                        </button>
                    </div>
                    <div className="saved-info">
                        <div className="saved-partner">{video.partnerName}</div>
                        <h3 className="saved-title">{video.title}</h3>
                        <p className="saved-description">{video.description}</p>
                        <button
                            className="visit-store-btn"
                            onClick={() => handleVisitStore(video.partnerId, video.partnerName)}
                        >
                            <span className="store-icon">🏪</span>
                            Visit Store
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Saved