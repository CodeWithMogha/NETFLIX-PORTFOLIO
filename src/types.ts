// types.ts

export interface ProfileBanner {
  backgroundImage: { url: string };
  headline: string;
  resumeLink: {
    url: string;
  };
  linkedinLink: string;
  profileSummary: string;
}

export interface WorkPermit {
  visaStatus: string;
  expiryDate: Date;
  summary: string;
  additionalInfo: string;
}

export interface TimelineItem {
  timelineType: 'work' | 'education';
  name: string;
  title: string;
  techStack: string;
  summaryPoints: string[];
  dateRange: string;
}

export interface Project {
  title: string;
  projectDescription: string; // Hygraph field name
  techUsed?: {
    text: string;       // Rich text returns { text }
  };
  image: {
    url: string;
  };
}

// src/types.ts

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  category: string;
  credentialUrl: string;
  number: number;
  logo?: {
    url: string;
  };
};

export interface ContactMe {
  profilePicture: { url: string };
  name: string;
  title: string;
  summary: string;
  companyUniversity: string;
  linkedinLink: string;
  email: string;
  phoneNumber: string;
}

export interface Skill {
  name: string;
  category: string;
  description: string;
  icon: string;
}

export interface Recommendation {
  name: string;
  designation: string;
  organization: string;
  message: string;
  linkedin?: string;
  email?: string;
  photo: {
    url: string;
  };
  order: number;
}
