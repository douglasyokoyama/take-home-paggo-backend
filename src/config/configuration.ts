export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  frontendurl: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,
});
