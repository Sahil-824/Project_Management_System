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
  projectStatus: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  timeLines: {
    type: String,
  },
  members: {
    type: [String], // here we can store email for sending notifications...
  },
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectDescription: {
    type: String,
  },
});

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
