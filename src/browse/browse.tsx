import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import './browse.css';
import recruiterImage from '../images/recruiter.png';
import developerImage from '../images/developer.png';
import stalkerImage from '../images/stalker.png';
import adventurerImage from '../images/adventurer.png';
import recruiterVideo from '../videos/recruiter.mp4';
import developerVideo from '../videos/developer.mp4';
import stalkerVideo from '../videos/stalker.mp4';
import adventurerVideo from '../videos/adventurer.mp4';

const Browse: React.FC = () => {
  const navigate = useNavigate();

  const profiles = [
    {
      name: "recruiter",
      image: recruiterImage,
      backgroundVideo: recruiterVideo,
    },
    {
      name: "developer",
      image: developerImage,
      backgroundVideo: developerVideo,
    },
    {
      name: "stalker",
      image: stalkerImage,
      backgroundVideo: stalkerVideo,
    },
    {
      name: "adventurer",
      image: adventurerImage,
      backgroundVideo: adventurerVideo,
    },
  ];

  const handleProfileClick = (profile: { name: string; image: string; backgroundVideo: string }) => {
    navigate(`/profile/${profile.name}`, {
      state: {
        profileImage: profile.image,
        backgroundVideo: profile.backgroundVideo,
      },
    });
  };

  return (
    <div className="browse-container">
      <p className='who-is-watching'>Who's Watching?</p>
      <div className="profiles">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            image={profile.image}
            onClick={() => handleProfileClick(profile)}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;
