const fetchRepoIssuesController = require("../controllers/fetchRepoIssuesController");
const schema = require("../config/schema.json");
const fetchPublicRepoCommits = require("../controllers/fetchCommitHistoryController");
const fetchPublicRepos = require("../controllers/fetchPublicReposController");
const fetchPublicRepoPullRequests = require("../controllers/fetchRepoPullRequest");
const createNewIssue = require("../controllers/createIssueController");
const createPublicRepo = require("../controllers/createRepositoryLinkController");
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
  fastify.post(
    schema.githubApis["createNewIssue"].schema.url,
    schema.githubApis["createNewIssue"],
    createNewIssue,
  );
  fastify.post(
    schema.githubApis["createNewRepo"].schema.url,
    schema.githubApis["createNewRepo"],
    createPublicRepo
  );
}

module.exports = routes;
