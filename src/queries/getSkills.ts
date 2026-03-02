import { request } from 'graphql-request';

const endpoint = process.env.REACT_APP_HYGRAPH_ENDPOINT!;
const token = process.env.REACT_APP_HYGRAPH_TOKEN!;

export async function getSkills() {
  const QUERY = `
    query {
      skills(stage: PUBLISHED, orderBy: order_ASC, first: 100) {
        title
        category
        image {
          url
        }
      }
    }
  `;

  const data: any = await request(
    endpoint,
    QUERY,
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );

  return data.skills;
}