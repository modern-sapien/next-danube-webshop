export const defaults = {
  testTime: process.env.NEXT_PUBLIC_NODE_ENV === "production" || "staging" ? 60000 : 45000,
  waitTime: process.env.NEXT_PUBLIC_NODE_ENV === "production" || "staging" ? 10000 : 5000,
  projectName: process.env.NEXT_PUBLIC_NODE_ENV,
  testUser:
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? { email: "jane@example.com", password: "password2" }
      : {
          email: "staging-sam@example.com",
          password: "staging-password1",
        },
  pageUrl:
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? "https://next-danube-webshop.vercel.app"
      : process.env.NEXT_PUBLIC_NODE_ENV === "staging"
      ? "https://next-danube-webshop-staging.vercel.app"
      : process.env.NEXT_PUBLIC_ENVIRONMENT_URL,
  apiUrl:
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? "https://next-danube-webshop-backend.vercel.app/api/v1"
      : "https://next-danube-webshop-backend-staging.vercel.app/api/v1",
};
