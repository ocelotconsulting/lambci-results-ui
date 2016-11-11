const fs = require('fs')
const title = 'Lambda CI Results'

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link rel="shortcut icon" href="/images/lamb.png">
  <link rel="stylesheet" type="text/css" 
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="/styles.css">
</head>
<body>
  <div id="main"></div>
  <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
</body>
</html>
`.trim()

const build = () =>
  fs.writeFileSync('public/index.html', html, {encoding: 'utf8'})

module.exports = {html, build}
