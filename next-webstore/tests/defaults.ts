// @ts-nocheck

const projectEnv = process.env.NEXT_PUBLIC_ENVIRONMENT;
console.log(`projectEnv in defaults: ${projectEnv}`);

export const defaults = {
  apiKey: process.env.CHECKLY_API_KEY,
  testTime: ['production', 'staging'].includes(process.env.NODE_ENV) ? 45000 : 60000,
  waitTime: ['production', 'staging'].includes(process.env.NODE_ENV) ? 2500 : 3000,
  projectEnv: projectEnv,
  testUser:
  projectEnv === 'production'
      ? { email: 'jane@example.com', password: 'password2' }
      : { email: 'staging-sam@example.com', password: 'staging-password1' },
  pageUrl: (() => {
    if (projectEnv === 'production') return 'https://next-danube-webshop.vercel.app';
    if (projectEnv === 'staging') return 'https://next-danube-webshop-staging.vercel.app';
    return process.env.NEXT_PUBLIC_ENVIRONMENT_URL || '';
  })(),
  apiUrl:
  projectEnv === 'production'
      ? 'https://next-danube-webshop-backend.vercel.app/api/v1'
      : 'https://next-danube-webshop-backend-staging.vercel.app/api/v1',
};

// export const defaults = {
//   projectEnv: projectEnv,
//   apiKey: process.env.CHECKLY_API_KEY,
//   // Use NODE_ENV to set time defaults in one line
//   testTime: ['production', 'staging'].includes(process.env.NODE_ENV) ? 45000 : 60000,
//   waitTime: ['production', 'staging'].includes(process.env.NODE_ENV) ? 2500 : 3000,
//   scheduleTime: projectEnv: 'production' ? 5 : 30,
//   // Conditional user object
//   testUser: {
//     email: projectEnv === 'production' ? 'jane@example.com' : 'staging-sam@example.com',
//     password: projectEnv === 'production' ? 'password2' : 'staging-password1',
//   }
//   // Page URL based on environment with default fallback
//   pageUrl: {
//     projectEnv === 'production'
//       ? 'https://next-danube-webshop.vercel.app'
//       : projectEnv === 'staging'
//       ? 'https://next-danube-webshop-staging.vercel.app'
//       : process.env.NEXT_PUBLIC_ENVIRONMENT_URL || '',

//   // API URL with similar pattern
//   apiUrl:
//     projectEnv === 'production'
//       ? 'https://next-danube-webshop-backend.vercel.app/api/v1'
//       : 'https://next-danube-webshop-backend-staging.vercel.app/api/v1',
// };
