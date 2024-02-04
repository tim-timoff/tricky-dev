import logger from "../logger";
import { emailMessageType } from "../mConstants";


// sample HTML content for the email
const htmlContent = `
<html>
  <head>
    <style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Spectral&display=swap" rel="stylesheet">
      body {
        font-family: 'Spectral', serif; Arial, sans-serif;
      }
      h4 {
        color: #101a79;;
      }
      farewell {
        font-weight: 500;
        padding-top: 4px;
      }
    </style>
  </head>
  <body>
    <h4>Приветствую!</h4>
    <p class="farewell">С уважением, ваш Tricky.</p>
  </body>
</html>
`;

// Composing email content
export function composeEmail(type: emailMessageType, recipient: any) {
  let result = 'failed';
  switch (type) {
    case emailMessageType.testUserEmailConfirmationLink: {
      const insertAfter = '</h4>';
      let pos = findPosition(htmlContent, insertAfter);
      const email = recipient.email;
      if (pos !== -1) {
        pos = pos + insertAfter.length;
        const id = recipient.getObjectId();
        logger.debug(`Substring found at position ${pos}; user id pucked: ${id}.`);
        
        // Here goes the message
        const insert = `<p>Вы получили это сообщение, потому что Ваш электронный адрес ${email} был использован для регистрации на сайте Tricky English. Если вы этого не делали, то вы можете удалить свой электронный адрес из нашей базы по этой <a href="#">ссылке</a>. Если же это были Вы, то, пожалуйсте, подтвердите свой электронный адрес по этой <a href="http://trickyenglish.media/tu/emailconfirmation?u=${id}&l=${recipient.emailConfirmationLink}">ссылке</a>.</p>`;

        // TODO resulted link: http://trickyenglish.media/tu/emailconfirmation?u=undefined&l=EkJRyodXzoQU
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
