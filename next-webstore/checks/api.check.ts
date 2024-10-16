import { ApiCheck, AssertionBuilder } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';

new ApiCheck(`next-danube-${defaults.projectEnv}-books-api-check`, {
  name: `Next Danube API ${defaults.projectEnv} - Books`,
  group,
  degradedResponseTime: 3000,
  frequency: 1,
  maxResponseTime: 5000,
  request: {
    url: `https://next-danube-webshop-backend-${defaults.projectEnv}.vercel.app/api/v1/books`,
    method: 'GET',
    followRedirects: true,
    bodyType: "RAW",
    body: "hello",
    skipSSL: false,
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
});

new ApiCheck(`next-danube-${defaults.projectEnv}-reviews-api-check`, {
  name: `Next Danube API ${defaults.projectEnv} - Reviews`,
  group,
  degradedResponseTime: 3000,
  frequency: 1,
  maxResponseTime: 5000,
  request: {
    url: `https://next-danube-webshop-backend-${defaults.projectEnv}.vercel.app/api/v1/reviews`,
    method: 'GET',
    followRedirects: true,
    skipSSL: false,
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
});
