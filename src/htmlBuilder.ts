// HTML builder module
import logger from "./logger";
import { findPosition, insertText } from "./mFunctions";

function putTitle(html: string, title: string) {
  const pos = findPosition(html, "</title>");
  return insertText(html, pos, title);
}

function getTemplate(): string {
  // Customize the HTML structure based on the content
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/assets/img/fav/favicon.ico" type="image/x-icon">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="/assets/css/tricky-dev.css">
    <title></title>
  </head>
  <body>
  </body>
  </html>
`;
}

class HtmlBuilder {
  private html: string

  constructor() {
    this.html = getTemplate();
  }

  // public static addElement(htmlTag: string, htmlClass: string, htmlID: string, insertAfterID: string, content: string) : string {
  //   // html tags go like this: "p", "div" etc...
  //   // insertAfter 
  // }
}