import { Log } from "../types/log.type";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { FILEHANDLER } from "../fileHandler";
const resolvers = {
  Query: {
    UpdatedLogs: UpdatedLogsResolver
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const GraphQL = server;

async function UpdatedLogsResolver(): Promise<Log[]> {
  return await FILEHANDLER.getUpdatedLog();
}
