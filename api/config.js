module.exports = {
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1',
  stackName: process.env.LAMBCI_STACK_NAME || 'lambci'
}
