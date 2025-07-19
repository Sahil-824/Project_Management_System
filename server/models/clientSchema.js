const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  projectIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  githubUsername: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  clientName: {
    type: String,
    trim: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
