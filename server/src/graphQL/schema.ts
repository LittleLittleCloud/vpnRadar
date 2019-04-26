import {gql} from 'apollo-server';

const typeDefs = gql`
    type Query {
        Logs:[Log]
    }

    type Log {
        date: Date!
        type: LogType!
        from: IP!
        to: URL!
        msg: String!
    }

    type IP {
        address: IP_ADDR!
        location: LOCATION!
    }

    type LOCATION {
        X: Float!
        y: Float!
    }

    scalar Date
    scalar URL

    enum LogType {
        WARNING
        INFO
        ERROR
    }
`;

export {typeDefs};