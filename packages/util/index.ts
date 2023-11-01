export function nl2br(str: string) {
  return str.replace(/\r\n/g, "<br />").replace(/(\n|\r)/g, "<br />");
}
