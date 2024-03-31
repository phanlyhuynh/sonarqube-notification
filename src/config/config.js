const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { NODE_ENV, PORT, HOST, SLACK_TOKEN, DATABASE_URL, WEBHOOK_URL, SONARQUBE_HOST } = process.env;

module.exports = {
  env: NODE_ENV || 'development',
  port: PORT || '3000',
  host: HOST || '0.0.0.0',
  slackToken: SLACK_TOKEN || '',
  db: {
    databaseUrl: DATABASE_URL || '',
    options: {
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  },
  webhookUrl: WEBHOOK_URL || '',
  sonarqubeHost: SONARQUBE_HOST || '',
};
