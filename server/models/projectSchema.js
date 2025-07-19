const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  githubRepoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      type: String,
      trim: true,
    },
  ],
  timeLines: {
    type: String,
  },
  members: {
    type: [String], // here we can store email for sending notifications...
  },
});

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
