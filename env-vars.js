module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'dev',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
};
