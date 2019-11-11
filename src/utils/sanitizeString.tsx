const sanitizeString = (str: string) =>
  str
    .replace(/(\r\n|\n|\r)/gm, " ") // remove line breaks
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") // remove all punctuation
    .replace(/\s{2,}/g, " "); // remove extra spaces

export default sanitizeString;
