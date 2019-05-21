import ApolloClient from 'apollo-boost';
import { Config } from './config';

const client = new ApolloClient({
    uri: Config["apollo-server"]
});

export const Client = client;