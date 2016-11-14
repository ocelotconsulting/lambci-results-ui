module.exports = (res, projectId) =>
  res.status(404).send(`project not found '${projectId}'`)
