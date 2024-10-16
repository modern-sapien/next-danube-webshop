import { Dashboard } from "checkly/constructs";

const getEnvironment = () => {
  if (process.env.NEXT_PUBLIC_NODE_STAGING === 'staging') return 'staging';
  if (process.env.NEXT_PUBLIC_NODE_PRODUCTION === 'production')
    return 'production';
  return 'preview';
};

// Determine the environment
const env = getEnvironment();

new Dashboard(`next-danube-${env}-dashboard-1`, {
  header: `Next Danube ${env} Dashboard`,
  description: 'service availability and response times',
  tags: [`${env}`],
  logo: 'https://coralogix.com/wp-content/uploads/2023/05/Checkly-96X96.svg',
  customUrl: `status-test-cli-${env}-custom`,
})