require("dotenv").config({ path: __dirname + '/.env' });

function getConfig() {
  return {
    PORT: process.env.PORT,
    db: {
      HOST: process.env.DB_HOST,
      NAME: process.env.DB_NAME,
      auth: {
        USER: process.env.DB_USER,
        PASS: process.env.DB_PASS,
      },
    },
    session: {
      SECRET: process.env.SESSION_SECRET,
    },
    httpsServer: {
      CERT_PATH: process.env.HTTPS_CERTIFICATE,
      PRIV_KEY: process.env.HTTPS_PRIVATE_KEY,
    },
  };
}

module.exports = {
  getConfig,
};
