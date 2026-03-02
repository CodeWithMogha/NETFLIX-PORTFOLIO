import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './profilePage.css';

import Navbar from '../components/NavBar';
import ProfileBanner from './ProfileBanner';
import TopPicksRow from './TopPicksRow';


type ProfileType = 'recruiter' | 'developer' | 'stalker' | 'adventure';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { profileName } = useParams();

  const backgroundVideo = location.state?.backgroundVideo;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // 🔥 SAFE PROFILE DETECTION
  const profile: ProfileType =
    profileName === 'developer'
      ? 'developer'
      : profileName === 'stalker'
        ? 'stalker'
        : profileName === 'adventure'
          ? 'adventure'
          : 'recruiter';

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      setIsMuted(false);
    }
  }, [profileName]);

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="hero-video"
        >
          {backgroundVideo && <source src={backgroundVideo} />}
        </video>

        <div className="hero-overlay" />

        <div className="netflix-controls">
          <button onClick={toggleMute} className="netflix-mute-btn">
            🔊
          </button>
          <div className="netflix-rating-badge">U/A 13+</div>
        </div>

        <div className="hero-content hero-content-positioned">
          <ProfileBanner />
        </div>
      </div>

      {/* 🔥 PROFILE BASED RENDERING */}
      <div className="profile-rows-container">
        <TopPicksRow profile={profile} />
      </div>

    </>
  );
};

export default ProfilePage;