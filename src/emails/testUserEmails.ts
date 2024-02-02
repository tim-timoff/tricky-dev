import logger from "../logger";
import { emailMessageType } from "../mConstants";


// sample HTML content for the email
const htmlContent = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h4 {
        color: #101a79;;
      }
    </style>
  </head>
  <body>
    <h4>Приветствую!</h4>
    <p>С уважением, ваш Tricky.</p>
  </body>
</html>
`;

// Composing email content
export function composeEmail(type: emailMessageType, recipient: string) {
  let result = 'failed';
  switch (type) {
    case emailMessageType.testUserEmailConfirmationLink: {
      const insertAfter = '</h4>';
      const pos = findPosition(htmlContent, insertAfter);
      const email = recipient;
      if (pos !== -1) {
        logger.debug(`Substring found at position ${pos}.`);
        // Here goes the message
        const insert = `<p>Вы получили это сообщение, потому что Ваш электронный адрес ${email} был использован для регистрации на сайте Tricky English. Если вы этого не делали, то вы можете удалить свой электронный адрес из нашей базы по этой <a href="">ссылке</a><br>. Если же это были Вы, то, пожалуйсте, подтвердите свой электронный адрес по этой <a href="">ссылке</a>.</p>`;
        result = insertText(htmlContent, pos, insert);
        logger.debug(`Message composed: ${result}`)
      } else {
        logger.warn('Substring not found');
      }
      break;
    }
  }
  return result;
}

// Finding where to insert data
function findPosition(originalString: string, substring: string): number {
  return originalString.indexOf(substring);
}

// Inserting text and data
function insertText(original: string, pos: number, insert: string): string {
  const start = original.slice(0, pos);
  const end = original.slice(pos);
  const modifiedString = start + insert + end;
  return modifiedString;
}
