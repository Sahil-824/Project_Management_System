const axios = require("axios");

async function createNewIssue(req, res) {
  const { owner, repo, title, body, token, assignees = [] } = req.body;
  const options = {
    method: "POST",
    url: `https://api.github.com/repos/${owner}/${repo}/issues`,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "issue-raiser-script",
    },
    data: {
      title,
      body,
      assignees,
    },
  };

  console.log("🔗 API: Create Issue on Public Repository");
  console.log("📦 Axios Request Options:", options);

  try {
    const response = await axios(options);
    console.log(
      `✅ Issue Created: #${response.data.number} - ${response.data.title}`,
    );
    return res.status(200).send({ status: "success", response: response.data });
  } catch (error) {
    console.error(
      "❌ Error creating issue:",
      error.response?.data || error.message,
    );
    return res.status(400).send({
      error: "Failed to fetch commits",
      details: error.response?.data || error.message,
    });
  }
}

module.exports = createNewIssue;
