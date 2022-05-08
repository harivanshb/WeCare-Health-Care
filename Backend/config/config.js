const AWS = require("aws-sdk");

const AWS_CONFIG_S3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION,
});

const S3_PARAMS = {
  Bucket: process.env.S3_BUCKET,
  Key: "key",
  Body: "",
};
