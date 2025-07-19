const axios = require("axios");

async function fetchPublicRepos(req, res) {
  const { owner } = req.body;

  if (!owner) {
    return res.status(400).send({ error: "Missing required field: 'owner'" });
  }

  try {
    const options = {
      method: "GET",
      url: `https://api.github.com/users/${owner}/repos`,
      params: {
        per_page: 100,
        type: "public",
      },
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "public-repo-fetcher",
      },
    };

    console.log("🔗 API: Get Public Repos for User");
    console.log("📦 Axios Request Options:", options);

    const response = await axios(options);

    const repos = response.data.map((repo) => ({
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
    }));
    console.log("Fetched Public Repos: ", repos);
    return res.status(200).send({ status: "success", response: repos });
  } catch (error) {
    console.error("Error fetching repos:", error.message);
    return res.status(400).send({
      error: "Failed to fetch user repos",
      details: error.response?.data || error.message,
    });
  }
}

module.exports = fetchPublicRepos;
