
import { ApiCheck, AssertionBuilder } from 'checkly/constructs';


new ApiCheck('next-danube-books-api-check', {
  name: 'Next Danube API - Books',
  degradedResponseTime: 3000,
  maxResponseTime: 5000,
  request: {
    url: `https://next-danube-webshop-backend.vercel.app/api/v1/books`,
    method: 'GET',
    followRedirects: true,
    skipSSL: false,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
    ],
  },
});

new ApiCheck('next-danube-reviews-api-check', {
  name: 'Next Danube API - Reviews',
  degradedResponseTime: 3000,
  maxResponseTime: 5000,
  request: {
    url: `https://next-danube-webshop-backend.vercel.app/api/v1/reviews`,
    method: 'GET',
    followRedirects: true,
    skipSSL: false,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
    ],
  },
  
});