import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    Logs: [Log]
    UpdatedLogs: [Log]
  }

  type Log {
    date: Date!
    type: LogType!
    src: IP!
    dst: URL!
    msg: String!
  }

  type IP {
    address: IP_ADDR!
    location: LOCATION!
  }

  type LOCATION {
    X: Float!
    Y: Float!
  }

  scalar Date
  scalar URL
  scalar IP_ADDR

  enum LogType {
    WARNING
    INFO
    ERROR
  }
`;

export { typeDefs };
