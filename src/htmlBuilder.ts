// HTML builder module
function buildHtml(content: string): string {
    // Customize the HTML structure based on the content
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dynamic Route Example</title>
      </head>
      <body>
        <h1>${content}</h1>
      </body>
      </html>
    `;
  }