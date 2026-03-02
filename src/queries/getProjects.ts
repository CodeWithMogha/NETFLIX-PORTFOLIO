// queries/getProjects.ts
// Uses public (unauthenticated) request — Content API already has Read permission for projects.
// Permanent Auth Token only has Publish for projects, not Read, so we skip the Bearer header here.
import { GraphQLClient } from 'graphql-request';
import { Project } from '../types';

const endpoint = process.env.REACT_APP_HYGRAPH_ENDPOINT!;

// Public client — no Authorization header, uses Content API permissions
const publicClient = new GraphQLClient(endpoint);

const GET_PROJECTS = `
  query {
    projects(stage: PUBLISHED) {
      title
      projectDescription
      techUsed {
        text
      }
      image {
        url
      }
    }
  }
`;

export async function getProjects(): Promise<Project[]> {
  const data = await publicClient.request<{ projects: Project[] }>(GET_PROJECTS);
  return data.projects;
}
