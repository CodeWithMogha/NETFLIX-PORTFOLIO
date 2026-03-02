import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import {
  FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular,
  FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins,
  FaMicrosoft, FaPython, FaVuejs
} from 'react-icons/fa';
import {
  SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign,
  SiHtml5, SiCss3, SiJquery, SiAwsamplify,
  SiFirebase, SiTerraform, SiArgo
} from 'react-icons/si';
import { GrDeploy, GrKubernetes } from 'react-icons/gr';
import { Project } from '../types';
import { getProjects } from '../queries/getProjects';

const techIcons: { [key: string]: JSX.Element } = {
  'ReactJS': <FaReact />, 'React': <FaReact />,
  'NodeJS': <FaNodeJs />, 'Node.js': <FaNodeJs />, 'Express.js': <FaNodeJs />,
  'AWS': <FaAws />, 'Cognito': <FaAws />, 'Lambda': <FaAws />, 'ECS': <FaAws />, 'AWS-ECS': <SiAwsamplify />,
  'PostgreSQL': <SiPostgresql />, 'MongoDB': <SiMongodb />,
  'Ruby On Rails': <SiRubyonrails />, 'Material UI': <SiMaterialdesign />,
  'HTML5': <SiHtml5 />, 'CSS3': <SiCss3 />, 'jQuery': <SiJquery />, 'JQuery': <SiJquery />,
  'Jenkins': <FaJenkins />, 'Docker': <FaDocker />,
  'GraphQL': <FaDatabase />, 'CI/CD': <FaGitlab />, 'GitLab': <FaGitlab />, 'GitHub': <FaGithub />,
  'Heroku': <GrDeploy />, 'Netlify': <GrDeploy />,
  'Firebase': <SiFirebase />, 'GCP': <FaGoogle />, 'Azure': <FaMicrosoft />,
  'Kubernetes': <GrKubernetes />, 'Terraform': <SiTerraform />, 'ArgoCD': <SiArgo />,
  'Java': <FaJava />, 'Spring Boot': <FaJava />, 'Hibernate': <FaJava />,
  'Maven': <FaJava />, 'Gradle': <FaJava />, 'JUnit': <FaJava />, 'Mockito': <FaJava />,
  'Python': <FaPython />, 'Angular': <FaAngular />, 'Vue.js': <FaVuejs />,
  'Next.js': <FaReact />, 'Gatsby': <FaReact />, 'Nuxt.js': <FaVuejs />,
  'Redux': <FaReact />, 'Vuex': <FaVuejs />,
  'Tailwind CSS': <SiCss3 />, 'Bootstrap': <SiCss3 />, 'Jest': <FaReact />,
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    rowRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  if (loading) return <div className="projects-loading">Loading projects...</div>;
  if (error) return <div className="projects-error">{error}</div>;
  if (projects.length === 0) return <div className="projects-empty">No projects found.</div>;

  return (
    <div className="projects-section">
      <button className="row-arrow left" onClick={() => scroll('left')}>❮</button>
      <button className="row-arrow right" onClick={() => scroll('right')}>❯</button>

      <div className="projects-row" ref={rowRef}>
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            {/* Thumbnail */}
            {project.image?.url ? (
              <img
                src={project.image.url}
                alt={project.title}
                className="project-thumbnail"
              />
            ) : (
              <div className="project-thumbnail-fallback">🗂️</div>
            )}

            {/* Card Body */}
            <div className="project-body">
              <h3>{project.title}</h3>

              {project.projectDescription && (
                <p className="project-description">{project.projectDescription}</p>
              )}

              {project.techUsed?.text && (
                <div className="tech-used">
                  {project.techUsed.text
                    .split(', ')
                    .map((tech: string, i: number) => (
                      <span key={i} className="tech-badge">
                        {techIcons[tech] || '🔧'} {tech}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;