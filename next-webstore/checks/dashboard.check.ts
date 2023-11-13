import { Dashboard } from "checkly/constructs";

new Dashboard('next-danube-dashboard-1', {
  header: 'Next Danube Production Dashboard',
  description: 'service availability and response times',
  tags: ['production'],
  logo: 'https://assets.acme.com/images/acme-logo.png',
  customUrl: `status-test-cli-production`,
})

new Dashboard('next-danube-staging-dashboard-1', {
  header: 'Next Danube Staging Dashboard',
  description: 'service availability and response times',
  tags: ['staging'],
  logo: 'https://assets.acme.com/images/acme-logo.png',
  customUrl: `status-test-cli-staging`,
})
