const slackService = require('../services/slack');
const axios = require('axios');
const { Project } = require('../models')
const config = require('../config/config')

const notify = async (req, res) => {
  const sonarqubeUrl = config.sonarqubeHost;

  let project = {}
  if (req.body.project) {
    const uuid = req.params.uuid;
    project = await Project.findOne({'uuid': uuid});
    console.log(req.body);
  } else {
    console.log('Body is empty')
    return res.status(400).json({ message: 'Body is empty'});
  }

  const { projectKey, sonarqubeToken, slackChannelId } = project;
  const headers = {
    Authorization: `Bearer ${sonarqubeToken}`,
  };

  // TODO: Verify signature
  // const signature = req.headers['x-sonar-webhook-hmac-sha256'];
  // const body = req.rawBody.toString(); // Access the raw request body
  // const expectedSignature = crypto.createHmac('sha256', 'your_secret').update(body).digest('hex');
  // if (signature !== expectedSignature) {
  //   console.error('Invalid signature');
  //   res.status(403).send('Invalid signature');
  //   return
  // }

  try {
    const searchResponse = await axios.get(
      `${sonarqubeUrl}/api/issues/search?componentKeys=${projectKey}`,
      { headers }
    );

    console.log('Latest Issues:', searchResponse.data.issues);
    const reponse = await slackService.sendMessage(
      slackChannelId,
      searchResponse.data.issues,
      req.body
    );

    console.log('Send message to slack: ', reponse);
    res.status(200).send('success');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send(error.message);
  }
};

module.exports = {
  notify,
};
