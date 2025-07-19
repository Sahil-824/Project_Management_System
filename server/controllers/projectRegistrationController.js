const Projects = require("../models/projectSchema");
const Client = require("../models/clientSchema");
const mongoose = require("mongoose");
const sendMail = require("../utils/emailServiceUtil");

const projectRegistration = async (req, reply) => {
  try {
    const {
      projectName,
      projectDescription,
      githubRepoUrl,
      comments = [],
      projectStatus,
      startDate,
      timeLines,
      members = [],
    } = req.body;

    if (!projectName || !githubRepoUrl) {
      return reply
        .code(400)
        .send({ message: "Project name and GitHub repo URL are required." });
    }

    const newProject = new Projects({
      projectName,
      projectDescription,
      githubRepoUrl,
      comments,
      projectStatus,
      startDate,
      timeLines,
      members,
    });

    const savedProject = await newProject.save();

    const clientId = req.user?.id;

    if (!clientId) {
      return reply.code(401).send({ message: "Unauthorized: missing user ID" });
    }

    await Client.findByIdAndUpdate(
      clientId,
      { $push: { projectIds: savedProject._id } },
      { new: true },
    );

    return reply.code(201).send({
      message: "Project registered successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Project registration error:", error);
    return reply
      .code(500)
      .send({ message: "Server error during project registration" });
  }
};

const addProjectMembers = async (req, reply) => {
  try {
    const { projectId, member } = req.body;

    if (!projectId || !member) {
      return reply
        .code(400)
        .send({ message: "projectId and member are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return reply.code(400).send({ message: "Invalid projectId format." });
    }

    const memberStr = String(member).trim();

    if (memberStr.length === 0) {
      return reply
        .code(400)
        .send({ message: "Member email is empty or invalid." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(memberStr)) {
      return reply.code(400).send({ message: "Invalid email format." });
    }

    const project = await Projects.findById(projectId);
    if (!project) {
      return reply.code(404).send({ message: "Project not found." });
    }

    if (project.members.includes(memberStr)) {
      return reply.code(200).send({
        message: "Member already added.",
        members: project.members,
      });
    }

    project.members.push(memberStr);
    await project.save();
    await sendMail({
      emailId: memberStr,
      subject: "You have been added to a project",
      text: `You have been added as a member to the project: ${project.projectName}.`,
    });

    return reply.code(200).send({
      message: "Member added successfully.",
      members: project.members,
    });
  } catch (error) {
    console.error("Add members error:", error);
    return reply
      .code(500)
      .send({ message: "Server error while adding member." });
  }
};

module.exports = { projectRegistration, addProjectMembers };
