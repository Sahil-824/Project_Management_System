const fetchRepoIssuesController = require("../controllers/fetchRepoIssuesController");
const schema = require("../config/schema.json");
async function routes(fastify) {
  fastify.post(
    schema.githubApis["pullRequestFetch"].schema.url,
    schema.githubApis["pullRequestFetch"],
    fetchRepoIssuesController
  );
}

module.exports = routes;
