import { GraphQLClient } from "graphql-request";

const endpoint = process.env.REACT_APP_HYGRAPH_ENDPOINT || "";
const token = process.env.REACT_APP_HYGRAPH_TOKEN || "";

if (!endpoint || !token) {
  console.error("Hygraph endpoint or token missing in .env file. Please check your configuration.");
}

const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default hygraphClient;