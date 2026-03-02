import React, { useEffect, useState, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar as StarIcon } from 'react-icons/fa';
import './WorkExperience.css';
import { getTimeline } from '../queries/getTimeline';

type ExperienceItem = {
  title: string;
  yearRange: string;
  description: {
    text: string;
  };
  order: number;
};

interface WorkExperienceProps {
  isHorizontal?: boolean;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ isHorizontal = false }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    rowRef.current?.scrollBy({ left: dir === 'left' ? -600 : 600, behavior: 'smooth' });
  };
  const [timeLineData, setTimeLineData] = useState<ExperienceItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    async function fetchTimelineItem() {
      const data = await getTimeline();
      console.log('TIMELINE DATA 👉', data);
      setTimeLineData(data);
    }
    fetchTimelineItem();
  }, []);

  if (timeLineData.length === 0) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Loading timeline…</div>;
  }

  if (isHorizontal) {
    return (
      <section className="home-cert-section horizontal-timeline-section">
        <h2 className="row-title">Education & Professional Journey</h2>
        <button className="row-arrow left" onClick={() => scroll('left')}>❮</button>
        <button className="row-arrow right" onClick={() => scroll('right')}>❯</button>
        <div className="horizontal-timeline-row" ref={rowRef}>
          {timeLineData
            .sort((a, b) => a.order - b.order)
            .map((item, index) => {
              const isTop = index % 2 === 0;
              const isExpanded = !!expandedItems[index];
              const text = item.description?.text || '';
              const needsExpand = text.length > 120; // Show Read More if text is long

              return (
                <div key={index} className={`horizontal-timeline-item ${isTop ? 'item-top' : 'item-bottom'}`}>
                  <div className="timeline-node"></div>
                  <div className="timeline-content">
                    <h3 className="horizontal-timeline-title">{item.title}</h3>
                    <p className="horizontal-timeline-date">{item.yearRange}</p>
                    <div className={`horizontal-timeline-desc ${isExpanded ? 'expanded' : ''}`}>
                      {text}
                    </div>
                    {needsExpand && (
                      <button
                        className="expand-btn"
                        onClick={() => toggleExpand(index)}
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="timeline-container">
        <h2 className="timeline-title">Education & Professional Journey</h2>
      </div>

      <VerticalTimeline>
        {timeLineData
          .sort((a, b) => a.order - b.order)
          .map((item, index) => (
            <VerticalTimelineElement
              key={index}
              date={item.yearRange}
              iconStyle={{ background: '#e50914', color: '#fff' }}
              icon={<SchoolIcon />}
              contentStyle={{ color: '#fff', padding: '18px' }}
              contentArrowStyle={{ borderRight: '7px solid #1f1f1f' }}
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
                {item.description?.text || ''}
              </p>
            </VerticalTimelineElement>
          ))}

        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
    </>
  );
};

export default WorkExperience;