const fetchPublicRepoIssues = require("../controllers/pullRequestFetchController");
const schema = require("../config/schema.json");
async function routes(fastify) {
  fastify.post(
    schema.githubApis["pullRequestFetch"].schema.url,
    schema.githubApis["pullRequestFetch"],
    fetchPublicRepoIssues,
  );
}

module.exports = routes;
