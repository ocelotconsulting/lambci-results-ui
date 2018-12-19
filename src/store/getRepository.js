import startsWith from 'underscore.string/startsWith'

const githubPrefix = 'gh/'

export default projectId => startsWith(projectId, githubPrefix) ? {
  baseUrl: 'https://github.com',
  icon: 'github',
  project: projectId.slice(githubPrefix.length)
} : {}
