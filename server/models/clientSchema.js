const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  projectIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects", // must match Project model name
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

const Clients = mongoose.model("Clients", clientSchema);
module.exports = Clients;
