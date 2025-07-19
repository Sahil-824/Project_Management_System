const fetchRepoIssuesController = require("../controllers/fetchRepoIssuesController");
const emailServicesController = require("../controllers/emailServiceController");
const schema = require("../config/schema.json");
async function routes(fastify) {
  fastify.post(
    schema.githubApis["pullRequestFetch"].schema.url,
    schema.githubApis["pullRequestFetch"],
    fetchRepoIssuesController,
  );
  fastify.post(
    schema.emailService.schema.url,
    schema.emailService,
    emailServicesController,
  );
}

module.exports = routes;
