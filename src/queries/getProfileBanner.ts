import { request } from 'graphql-request';

const endpoint = process.env.REACT_APP_HYGRAPH_ENDPOINT!;
const token = process.env.REACT_APP_HYGRAPH_TOKEN!;

export async function getProfileBanner() {
  const query = `
    query {
      profileBanners {
        headline
        profileSummary
        resumeLink
        linkedinLink
      }
    }
  `

  const data: any = await request(
    endpoint,
    query,
    {},
    { Authorization: `Bearer ${token}` }
  );

  return data.profileBanners[0];
}