const axios = require("axios");

async function fetchRepoIssuesController(req, res) {
  const { owner, repoLink } = req.body;

  if (!owner || !repoLink) {
    return res.status(400).send({
      error: "Missing required fields: 'owner' and/or 'repoLink'",
    });
  }

  const url = `https://api.github.com/repos/${owner}/${repoLink}/issues`;

  try {
    const response = await axios.get(url, {
      params: {
        state: "open",
        per_page: 100,
      },
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "public-issue-fetcher",
      },
    });

    const issues = response.data
      .filter((issue) => !issue.pull_request)
      .map((issue) => ({
        number: issue.number,
        title: issue.title,
        url: issue.html_url,
      }));

    return res.status(200).send({ status: success, issues });
  } catch (error) {
    console.error(
      "Error fetching issues:",
      error.response?.data || error.message,
    );

    return res.status(400).send({
      error: "Failed to fetch issues",
      details: error.response?.data || error.message,
    });
  }
}

module.exports = fetchRepoIssuesController;
