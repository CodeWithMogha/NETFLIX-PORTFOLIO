import { request } from 'graphql-request';

const endpoint = process.env.REACT_APP_HYGRAPH_ENDPOINT!;
const token = process.env.REACT_APP_HYGRAPH_TOKEN!;

const QUERY = `
  query {
    experiences(stage: PUBLISHED, orderBy: order_ASC) {
      title
      yearRange
      description{
      text
      }
      order
    }
  }
`;

export async function getTimeline() {
  const data = await request<{
    experiences: {
      title: string;
      yearRange: string;
      description: {
        text: string;
      };
      order: number;
    }[];
  }>(
    endpoint,
    QUERY,
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );

  return data.experiences ?? [];
}