const { Project } = require("../models");
const { v4: uuidv4 } = require("uuid");
const config = require("../config/config");

const getList = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render('./projects/create.pug', { projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const store = async (req, res) => {
  const { name, projectKey, sonarqubeToken, slackChannelId } = req.body;
  const data = new Project({
    name,
    projectKey,
    sonarqubeToken,
    slackChannelId,
    uuid: uuidv4(),
  });

  try {
    await data.save();
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Project.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  store,
  remove,
  getList
};
