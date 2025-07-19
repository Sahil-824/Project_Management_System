const axios = require("axios");

async function fetchPublicRepoCommits(req, res) {
  const { owner, repoLink } = req.body;

  if (!owner || !repoLink) {
    return res.status(400).send({
      error: "Missing required fields: 'owner' and/or 'repoLink'",
    });
  }

  const options = {
    method: "GET",
    url: `https://api.github.com/repos/${owner}/${repoLink}/commits`,
    params: {
      per_page: 100,
    },
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "public-commit-fetcher",
    },
  };

  console.log("🔗 API: Get Commits for Repository");
  console.log("📦 Axios Request Options:", options);

  try {
    const response = await axios(options);

    const commits = response.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));
    console.log("Fetched Commits: ", commits);
    return res.status(200).send({ status: "success", response: commits });
  } catch (error) {
    console.error("Error fetching commits:", error.message);
    return res.status(400).send({
      error: "Failed to fetch commits",
      details: error.response?.data || error.message,
    });
  }
}

module.exports = fetchPublicRepoCommits;
