const sendMail = require("../utils/emailServiceUtil.js");
const emailServicesController = async (request, reply) => {
  try {
    const { emailId, subject, text } = request.body;
    console.log("Sending email to:", emailId);
    await sendMail({ emailId, subject, text });
    console.log("Email sent successfully");
    return reply.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error in emailServicesController:", error);
    throw error;
  }
};

module.exports = emailServicesController;
