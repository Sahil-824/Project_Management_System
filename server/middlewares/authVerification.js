const jwt = require("jsonwebtoken");

const verifyAuthToken = async (req, reply) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply
        .code(401)
        .send({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return reply.code(401).send({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAuthToken;
