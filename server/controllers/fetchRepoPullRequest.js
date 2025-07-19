const axios = require("axios");

async function fetchPublicRepoPullRequests(req, res) {
  const { owner, repoLink } = req.body;

  if (!owner || !repoLink) {
    return res.status(400).send({
      error: "Missing required fields: 'owner' and/or 'repoLink'",
    });
  }

  const options = {
    method: "GET",
    url: `https://api.github.com/repos/${owner}/${repoLink}/pulls`,
    params: {
      state: "all",
      per_page: 100,
    },
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "public-pr-fetcher",
    },
  };

  console.log("🔗 API: Get Pull Requests for Repository");
  console.log("📦 Axios Request Options:", options);

  try {
    const response = await axios(options);

    const pullRequests = response.data.map((pr) => ({
      number: pr.number,
      title: pr.title,
      url: pr.html_url,
      user: pr.user?.login,
    }));
    console.log("Fetched Pull Request: ", pullRequests);

    return res.status(200).send({ status: "success", response: pullRequests });
  } catch (error) {
    console.error("Error fetching pull requests:", error.message);
    return res.status(400).send({
      error: "Failed to fetch pull requests",
      details: error.response?.data || error.message,
    });
  }
}

module.exports = fetchPublicRepoPullRequests;
