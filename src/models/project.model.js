const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  projectKey: {
    required: true,
    type: String,
    unique : true,
  },
  sonarqubeToken: {
    required: true,
    type: String,
  },
  slackChannelId: {
    required: true,
    type: String,
  },
  uuid: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model("Project", projectSchema);
