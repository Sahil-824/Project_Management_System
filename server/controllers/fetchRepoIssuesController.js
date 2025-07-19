const axios = require("axios");

async function fetchRepoIssuesController(req, res) {
  const { owner, repoLink } = req.body;

  if (!owner || !repoLink) {
    return res.status(400).send({
      error: "Missing required fields: 'owner' and/or 'repoLink'",
    });
  }
  const options = {
    method: "GET",
    url: `https://api.github.com/repos/${owner}/${repoLink}/issues`,
    params: {
      state: "open",
      per_page: 100,
    },
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "public-issue-fetcher",
    },
  };

  console.log("🔗 API: Get Issues for Repository");
  console.log("📦 Axios Request Options:", options);

  try {
    const response = await axios(options);

    const issues = response.data
      .filter((issue) => !issue.pull_request)
      .map((issue) => ({
        number: issue.number,
        title: issue.title,
        url: issue.html_url,
      }));
    console.log("Fetched Issues List: ", issues);

    return res.status(200).send({ status: "success", response: issues });
  } catch (error) {
    console.error(
      "Error fetching issues:",
      error.response?.data || error.message
    );

    return res.status(400).send({
      error: "Failed to fetch issues",
      details: error.response?.data || error.message,
    });
  }
}

module.exports = fetchRepoIssuesController;
