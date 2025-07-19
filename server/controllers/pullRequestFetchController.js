const axios = require("axios");

async function fetchPublicRepoIssues(req, res) {
  const reqBody = req.body;
  const url = `https://api.github.com/repos/${reqBody.owner}/${reqBody.repoLink}/issues`;

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

    const issues = response.data.filter((issue) => !issue.pull_request);

    issues.forEach((issue) => {
      console.log(`#${issue.number} - ${issue.title}`);
    });
  } catch (error) {
    console.error(
      "Error fetching issues:",
      error.response?.data || error.message
    );
  }
}

module.exports = fetchPublicRepoIssues;
