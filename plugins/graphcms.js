import { GraphQLClient } from 'graphql-request';

const graphcmsClient = new GraphQLClient(
  'https://api-ap-northeast-1.graphcms.com/v2/ckjtuh4qir82401zfgy2paha0/master'
);

export default (_, inject) => {
  inject('graphcms', graphcmsClient);
};
