const title = 'Lambda CI Results'

module.exports = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link rel="stylesheet" type="text/css" 
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="/styles.css">
</head>
<body>
  <div id="main"></div>
  <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
</body>
</html>
`
