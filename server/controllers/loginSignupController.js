const Client = require("../models/clientSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminSchema");

const clientLogin = async (req, reply) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const payload = {
      id: client._id,
      email: client.email,
      githubUsername: client.githubUsername,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return reply.code(200).send({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return reply.code(500).send({ message: "Server error" });
  }
};


const clientSignup = async (req, reply) => {
  try {
    const { email, password, githubUsername, clientName } = req.body;

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return reply
        .code(400)
        .send({ message: "Client already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      email,
      password: hashedPassword,
      githubUsername,
      clientName,
    });

    await newClient.save();

    const admin = await Admin.findOne(); 
    if (admin) {
      admin.clients.push({
        clientId: newClient._id,
        feedback: "",
        rating: null,
        createdAt: new Date(),
      });
      await admin.save();
    } else {
      console.warn("No admin document found. Skipping client push.");
    }

    const payload = {
      id: newClient._id,
      email: newClient.email,
      githubUsername: newClient.githubUsername,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return reply.code(201).send({
      message: "Signup successful",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return reply.code(500).send({ message: "Server error" });
  }
};

module.exports = { clientLogin, clientSignup};
