const mongoose = require("mongoose");
const Clients = require("../models/clientSchema");


const getClientProjects = async (req, reply) => {
  try {
    const { clientId } = req.query;

    if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) {
      return reply.code(400).send({ message: "Invalid or missing clientId" });
    }

    console.log("Fetching projects for clientId:", clientId);

    const client = await Clients.findById(clientId).populate("projectIds");

    if (!client) {
      return reply.code(404).send({ message: "Client not found" });
    }

    return reply.code(200).send({
      message: "Projects fetched successfully",
      projects: client.projectIds,
    });
  } catch (error) {
    console.error("Error fetching client projects:", error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

module.exports = getClientProjects;
