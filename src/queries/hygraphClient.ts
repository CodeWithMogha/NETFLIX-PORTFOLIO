import { GraphQLClient } from "graphql-request";

const endpoint = process.env.REACT_APP_HYGRAPH_ENDPOINT;
const token = process.env.REACT_APP_HYGRAPH_TOKEN;

if (!endpoint || !token) {
  throw new Error("Hygraph endpoint or token missing");
}

const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default hygraphClient;