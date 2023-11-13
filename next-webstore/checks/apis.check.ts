import { ApiCheck, AssertionBuilder } from 'checkly/constructs';

const getEnvironment = () => {
  if (process.env.NEXT_PUBLIC_NODE_STAGING === 'staging') return '-staging';
  if (process.env.NEXT_PUBLIC_NODE_PRODUCTION === 'production')
    return '';
  return '-staging';
};


// Determine the environment
const env = getEnvironment();

let nameEnv = env.split('-')[1]

new ApiCheck(`next-danube-${env}-books-api-check`, {
  name: `Next Danube API ${nameEnv} - Books`,
  degradedResponseTime: 3000,
  frequency: 5,
  maxResponseTime: 5000,
  request: {
    url: `https://next-danube-webshop-backend${env}.vercel.app/api/v1/books`,
    method: 'GET',
    followRedirects: true,
    skipSSL: false,
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
});

new ApiCheck(`next-danube-${env}-reviews-api-check`, {
  name: `Next Danube API ${nameEnv} - Reviews`,
  degradedResponseTime: 3000,
  frequency: 10,
  maxResponseTime: 5000,
  request: {
    url: `https://next-danube-webshop-backend${env}.vercel.app/api/v1/reviews`,
    method: 'GET',
    followRedirects: true,
    skipSSL: false,
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
});
