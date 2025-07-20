const Admin = require("../models/adminSchema");

const getAdminClients = async (req, reply) => {
  try {
    const admin = await Admin.findOne().populate("clients.clientId");

    if (!admin) {
      return reply.code(404).send({ message: "Admin not found" });
    }

    const clientData = admin.clients.map((entry) => {
      return {
        clientInfo: entry.clientId,
        feedback: entry.feedback,
        rating: entry.rating,
        createdAt: entry.createdAt,
      };
    });

    return reply.code(200).send({
      message: "Clients fetched successfully",
      clients: clientData,
    });
  } catch (error) {
    console.error("Error fetching clients from admin:", error);
    return reply.code(500).send({ message: "Server error" });
  }
};

module.exports = getAdminClients;
