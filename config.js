const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-3" });
const ssm = new AWS.SSM();

async function getParam(param) {
  try {
    const data = await ssm
      .getParameter({ Name: param, WithDecryption: false })
      .promise();
    const parameterValue = data.Parameter.Value;
    return parameterValue;
  } catch (err) {
    console.error("Error obtaining parameter value", err);
    throw err;
  }
}

async function getConfig(AWS) {
  // const httpsServer = {
  //   certificate: await getParam("PORTFOLIO_CERTIFICATE_PATH"),
  //   privateKey: await getParam("PORTFOLIO_PRIVATE_KEY"),
  // };

  return {
    port: 3001,
    db: {
      HOST: "cluster0.tpwjp.mongodb.net",
      auth: {
        DB_USER: await getParam("ALLOYMEAPP_DB_USER"),
        DB_PASS: await getParam("ALLOYMEAPP_DB_PASS"),
        DB_NAME: await getParam("ALLOYMEAPP_DB_NAME"),
      },
    },
    session: {
      SECRET: await getParam("ALLOYMEAPP_SESSION_SECRET"),
    },
  };
}

module.exports = {
  getConfig,
};
