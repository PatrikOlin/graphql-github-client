import gql from "graphql-tag";

export const REPO_SEARCH = gql`
  query ($search_query: String!) {
    search(query: $search_query, type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
            descriptionHTML
          }
        }
      }
    }
  }
`;
