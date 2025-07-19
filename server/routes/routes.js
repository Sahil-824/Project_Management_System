const fetchRepoIssuesController = require("../controllers/fetchRepoIssuesController");
const schema = require("../config/schema.json");
const fetchPublicRepoCommits = require("../controllers/fetchCommitHistoryController");
const fetchPublicRepos = require("../controllers/fetchPublicReposController");
const fetchPublicRepoPullRequests = require("../controllers/fetchRepoPullRequest");
async function routes(fastify) {
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
}

module.exports = routes;
