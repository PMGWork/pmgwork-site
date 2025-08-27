import { GraphQLClient } from 'graphql-request';
const endpoint = (import.meta.env.PUBLIC_GRAPHCMS_ENDPOINT as string);
export const graphcmsClient = new GraphQLClient(endpoint);