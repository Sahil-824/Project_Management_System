const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretKey = "HiMyNameIsDeveloperRishabh=@";

async function userRoutes(fastify, options) {
  // Register User
  fastify.post(
    "/createuser",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "password"],
          properties: {
            name: { type: "string", minLength: 4 },
            password: { type: "string", minLength: 5 },
            role: {
              type: "string",
              enum: ["admin", "client"],
              default: "user",
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, password, role } = request.body;

      try {
        // Check if user with same name exists
        const existingUser = await User.findOne({ name });
        if (existingUser) {
          return reply
            .status(400)
            .send({ error: "User already exists, please login!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
          name,
          password: hashedPassword,
          role: role || "user",
        });

        return reply.send({ success: true });
      } catch (error) {
        console.error(error);
        return reply.status(400).send({ success: false });
      }
    },
  );

  // Login User
  fastify.post(
    "/loginuser",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "password"],
          properties: {
            name: { type: "string", minLength: 4 },
            password: { type: "string", minLength: 5 },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, password } = request.body;

      try {
        const user = await User.findOne({ name });

        if (!user) {
          return reply.status(400).send({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return reply.status(400).send({ error: "Password incorrect" });
        }

        const tokenPayload = { User: { id: user.id, role: user.role } };
        const authToken = jwt.sign(tokenPayload, secretKey);

        return reply.send({ success: true, AuthToken: authToken });
      } catch (error) {
        console.error(error);
        return reply.status(400).send({ success: false });
      }
    },
  );
}

module.exports = userRoutes;
