// Util function to determine the environment
const getEnvironment = () => {
  if (process.env.NEXT_PUBLIC_NODE_STAGING === 'staging') return 'staging';
  if (process.env.NEXT_PUBLIC_NODE_PRODUCTION === 'production') return 'production';
  return 'default';
};

// Determine the environment
const env = getEnvironment();

export const defaults = {
  testTime: ['production', 'staging'].includes(env) ? 45000 : 60000,
  waitTime: ['production', 'staging'].includes(env) ? 2500 : 3000,
  projectName: env,
  testUser: env === 'production'
    ? { email: 'jane@example.com', password: 'password2' }
    : { email: 'staging-sam@example.com', password: 'staging-password1' },
  pageUrl: (() => {
    if (env === 'production') return 'https://next-danube-webshop.vercel.app';
    if (env === 'staging') return 'https://next-danube-webshop-staging.vercel.app';
    return process.env.NEXT_PUBLIC_ENVIRONMENT_URL;
  })(),
  apiUrl: env === 'production'
    ? 'https://next-danube-webshop-backend.vercel.app/api/v1'
    : 'https://next-danube-webshop-backend-staging.vercel.app/api/v1',
};

// export const defaults = {
//   testTime: ['production', 'staging'].includes(process.env.NEXT_PUBLIC_NODE_ENV)
//     ? 45000
//     : 60000,
//   waitTime: ['production', 'staging'].includes(process.env.NEXT_PUBLIC_NODE_ENV)
//     ? 2500
//     : 3000,
//   projectName: process.env.NEXT_PUBLIC_NODE_ENV,
//   testUser:
//     process.env.NEXT_PUBLIC_NODE_ENV === 'production'
//       ? { email: 'jane@example.com', password: 'password2' }
//       : { email: 'staging-sam@example.com', password: 'staging-password1' },
//   pageUrl: (() => {
//     const env = process.env.NEXT_PUBLIC_NODE_ENV;
//     if (env === 'production') return 'https://next-danube-webshop.vercel.app';
//     if (env === 'staging')
//       return 'https://next-danube-webshop-staging.vercel.app';
//     return process.env.NEXT_PUBLIC_ENVIRONMENT_URL;
//   })(),
//   apiUrl:
//     process.env.NEXT_PUBLIC_NODE_ENV === 'production'
//       ? 'https://next-danube-webshop-backend.vercel.app/api/v1'
//       : 'https://next-danube-webshop-backend-staging.vercel.app/api/v1',
// };
