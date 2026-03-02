import React, { useEffect, useState } from 'react';
import './ProfileBanner.css';
import PlayButton from '../components/PlayButton';
import MoreInfoButton from '../components/MoreInfoButton';
import { getProfileBanner } from '../queries/getProfileBanner';

type BannerData = {
  headline: string;
  profileSummary: string;
  resumeLink: { url: string };
  linkedinLink: string;
};

const ProfileBanner: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);

  useEffect(() => {
    getProfileBanner().then(setBannerData);
  }, []);

  if (!bannerData) return null;

  return (
    <div className="profile-banner">
      <div className="banner-content">
        <h1 className="banner-headline">{bannerData.headline}</h1>

        <p className="banner-description">
        {bannerData.profileSummary}
      </p>

        <div className="banner-buttons">
          <PlayButton
            label="Resume"
            onClick={() => window.open(bannerData.resumeLink.url, '_blank')}
          />
          <MoreInfoButton
            label="LinkedIn"
            onClick={() => window.open(bannerData.linkedinLink, '_blank')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;