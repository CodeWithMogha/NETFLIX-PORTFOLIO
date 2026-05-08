import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import './browse.css';
import recruiterImage from '../images/recruiter.png';
import developerImage from '../images/developer.png';
import stalkerImage from '../images/stalker.png';
import adventurerImage from '../images/adventurer.png';
// Profile background videos — hosted on Cloudinary CDN
const recruiterVideo = 'https://res.cloudinary.com/dqj9t5vu5/video/upload/v1777803157/recruiter_jexnua.mp4';
const developerVideo = 'https://res.cloudinary.com/dqj9t5vu5/video/upload/v1777803184/developer_s31zem.mp4';
const stalkerVideo = 'https://res.cloudinary.com/dqj9t5vu5/video/upload/v1777801694/stalker_ozyisq.mp4';
const adventurerVideo = 'https://res.cloudinary.com/dqj9t5vu5/video/upload/v1777803176/adventurer_gwaayy.mp4';

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
