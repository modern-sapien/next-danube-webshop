import { ApiCheck, AssertionBuilder } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';

new ApiCheck(`next-danube-${defaults.projectEnv}-books-api-check`, {
  name: `Next Danube API ${defaults.projectEnv} - Books`,
  group,
  degradedResponseTime: 1500,
  frequency: 1,
  maxResponseTime: 3000,
  request: {
    url: `${defaults.apiUrl}/books`,
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
  degradedResponseTime: 1500,
  frequency: 1,
  maxResponseTime: 3000,
  request: {
    url: `${defaults.apiUrl}/reviews`,
    method: 'POST',
    followRedirects: true,
    skipSSL: false,
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
});
