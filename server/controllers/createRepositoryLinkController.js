const axios = require("axios");

async function createPublicRepo(req, res) {
  const { repo, token, description = "" } = req.body;

  const options = {
    method: "POST",
    url: "https://api.github.com/user/repos",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "public-repo-creator",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    data: {
      name: repo,
      description,
      private: false,
      homepage: "https://github.com",
      auto_init: true,
    },
  };

  console.log("🔗 API: Create Public GitHub Repository");
  console.log("📦 Axios Request Options:", {
    method: options.method,
    url: options.url,
    data: options.data,
    headers: {
      Accept: options.headers.Accept,
      "User-Agent": options.headers["User-Agent"],
    },
  });

  try {
    const response = await axios(options);
    console.log(`✅ Repo Created: ${response.data.html_url}`);
    return res.code(200).send({ success: true, response: response.data });
  } catch (error) {
    console.error(
      "❌ Error Creating Repo:",
      error.response?.data || error.message
    );
    return res.code(400).send({ success: false, error });
  }
}

module.exports = createPublicRepo;
