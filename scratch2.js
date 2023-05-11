const regex = /^https:\/\/next-danube-webshop(-[a-zA-Z0-9]+)?\.vercel\.app$/;

const url1 = "https://next-danube-webshop.vercel.app";
const url2 = "https://next-danube-webshop-abc123.vercel.app";
const url3 = "https://next-danube-webshop-staging.vercel.app";

console.log(regex.test(url1)); // true
console.log(regex.test(url2)); // true
console.log(regex.test(url3)); // true