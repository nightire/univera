export default (options) => `
<!DOCTYPE html>
<html lang=${options.langauage || 'zh'}>
<head>
  <meta charset="UTF-8"/>
  <title>${options.title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
</head>
<body>${options.content}</body>
</html>
`.replace(/(^\s+)|(\r?\n)+/gm, '');
