import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState('')

    useEffect(() => {
        let isMounted = true
        setIsLoading(true)
        setError('')

        axios
            .get('/api/food', { withCredentials: true })
            .then((response) => {
                const items = response?.data?.fooditems || []
                const partnerItems = items.filter((item) => String(item.food_partner_id) === String(id))
                const partner = partnerItems[0]?.food_partners || null

                if (!isMounted) return
                setProfile(partner)
                setVideos(partnerItems)
            })
            .catch((err) => {
                if (!isMounted) return
                setError(err.response?.data?.message || 'Failed to load profile.')
            })
            .finally(() => {
                if (!isMounted) return
                setIsLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [ id ])

    const totalMeals = videos.length

    return (
        <main className="profile-page">
            <section className="profile-hero">
                <div className="profile-hero-card">
                    <div className="profile-meta">
                        <img
                            className="profile-avatar"
                            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D"
                            alt="Food partner avatar"
                        />

                        <div className="profile-info">
                            <h1 className="profile-title" title="Business name">
                                {profile?.name || 'Food Partner'}
                            </h1>
                            <p className="profile-subtitle" title="Address">
                                {profile?.address || 'Address not available'}
                            </p>
                        </div>
                    </div>

                    <div className="profile-stats" role="list" aria-label="Stats">
                        <div className="profile-stat" role="listitem">
                            <span className="profile-stat-label">meals uploaded</span>
                            <span className="profile-stat-value">{totalMeals}</span>
                        </div>
                        <div className="profile-stat" role="listitem">
                            <span className="profile-stat-label">contact name</span>
                            <span className="profile-stat-value">{profile?.contact_name || '—'}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="profile-content">
                <div className="profile-content-header">
                    <h2 className="profile-section-title">Uploaded Videos</h2>
                    <span className="profile-section-count">{totalMeals} items</span>
                </div>

                {isLoading && (
                    <div className="profile-state">Loading profile...</div>
                )}

                {!isLoading && error && (
                    <div className="profile-state error">{error}</div>
                )}

                {!isLoading && !error && videos.length === 0 && (
                    <div className="profile-state">No videos uploaded yet.</div>
                )}

                <section className="profile-grid" aria-label="Videos">
                    {videos.map((v) => (
                        <article key={v.id} className="profile-grid-item">
                            <div className="profile-video-wrapper">
                                <video
                                    className="profile-grid-video"
                                    src={v.video}
                                    muted
                                    controls
                                    playsInline
                                />
                            </div>
                            <div className="profile-video-meta">
                                <h3 className="profile-video-title">{v.name || 'Untitled'}</h3>
                                <p className="profile-video-desc">{v.description || 'No description provided.'}</p>
                            </div>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    )
}

export default Profile