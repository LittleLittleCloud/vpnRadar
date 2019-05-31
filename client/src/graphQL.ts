import ApolloClient, { gql } from "apollo-boost";
import { Config } from "./config";

const client = new ApolloClient({
  uri: Config["apollo-server"]
});

client
  .query({
    query: gql`
      {
        UpdatedLogs {
          src {
            location {
              X
              Y
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

export const Client = client;
