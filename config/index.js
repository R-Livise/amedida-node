require('dotenv').config();

module.exports = {
  dev: process.env.NODE_DEV !== 'production',
  port: process.env.PORT,
  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    database: process.env.MONGO_DB,
  },
  auth: {
    admin: {
      username: process.env.AUTH_ADMIN_USERNAME,
      password: process.env.AUTH_ADMIN_PASSWORD,
      email: process.env.AUTH_ADMIN_EMAIL,
    },
    JwtSecret: process.env.AUTH_JWT_SECRET,
  },
  apiKeyToken: {
    public: process.env.PUBLIC_API_KEY_TOKEN,
    admin: process.env.ADMIN_API_KEY_TOKEN,
  },
  googleClient: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
