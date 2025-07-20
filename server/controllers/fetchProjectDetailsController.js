const Projects = require("../models/projectSchema");
const mongoose = require("mongoose");

const fetchProjectById = async (req, reply) => {
  try {
    const { projectId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return reply.code(400).send({ message: "Invalid project ID" });
    }

    console.log("Fetching project with ID:", projectId);
    const project = await Projects.findById(projectId);

    if (!project) {
      return reply.code(404).send({ message: "Project not found" });
    }

    return reply.code(200).send({ project });
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
};

module.exports = fetchProjectById;
