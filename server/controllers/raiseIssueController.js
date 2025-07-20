const Projects = require("../models/projectSchema");
const sendMail = require("../utils/emailServiceUtil");

const raiseIssueController = async (req, reply) => {
  try {
    const { projectId, issueDescription, assignedTo } = req.body;

    if (!assignedTo || !projectId || !issueDescription) {
      return reply.code(400).send({ message: "Missing required fields" });
    }
    let emailId = assignedTo;

    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      { $push: { comments: issueDescription } },
      { new: true },
    );

    if (!updatedProject) {
      return reply.code(404).send({ message: "Project not found" });
    }
    let text = issueDescription;

    const subject = "Issue Raised";
    await sendMail({ emailId, subject, text });

    return reply.code(200).send({ message: "Issue raised successfully" });
  } catch (err) {
    console.error("Raise Issue Error:", err);
    return reply.code(500).send({ message: "Server error" });
  }
};

module.exports = raiseIssueController;
