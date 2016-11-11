module.exports = {
  region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
  configJsonKey: 'lambci-results-ui-config.json',
  stackName: process.env.DYNAMO_TABLE_PREFIX || 'lambci'
}
