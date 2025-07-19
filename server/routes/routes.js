const fetchRepoIssuesController = require("../controllers/fetchRepoIssuesController");
const emailServicesController = require("../controllers/emailServiceController");
const schema = require("../config/schema.json");
const fetchPublicRepoCommits = require("../controllers/fetchCommitHistoryController");
const fetchPublicRepos = require("../controllers/fetchPublicReposController");
const fetchPublicRepoPullRequests = require("../controllers/fetchRepoPullRequest");
const {
  clientLogin,
  clientSignup,
} = require("../controllers/loginSignupController.js");
async function routes(fastify) {
  // fastify.post(
  //   schema.githubApis["pullRequestFetch"].schema.url,
  //   schema.githubApis["pullRequestFetch"],
  //   fetchRepoIssuesController,
  // );
  fastify.post(
    schema.emailService.schema.url,
    schema.emailService,
    emailServicesController,
  );
  fastify.post(
    schema.githubApis["fetchIssuesList"].schema.url,
    schema.githubApis["fetchIssuesList"],
    fetchRepoIssuesController,
  );
  fastify.post(
    schema.githubApis["fetchRepoLinks"].schema.url,
    schema.githubApis["fetchRepoLinks"],
    fetchPublicRepos,
  );
  fastify.post(
    schema.githubApis["fetchCommitHistory"].schema.url,
    schema.githubApis["fetchCommitHistory"],
    fetchPublicRepoCommits,
  );
  fastify.post(
    schema.githubApis["fetchPullRequest"].schema.url,
    schema.githubApis["fetchPullRequest"],
    fetchPublicRepoPullRequests,
  );

  fastify.post(schema.clientLogin.schema.url, schema.clientLogin, clientLogin);

  fastify.post(
    schema.clientSignup.schema.url,
    schema.clientSignup,
    clientSignup,
  );
}

module.exports = routes;
