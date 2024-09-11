export default function getFormElement(formName: string, elementName: string): HTMLInputElement {
  // why use the any type here ? 
  // because TypeScript thinks that number is the only type
  // that should be used to access properties in document.forms
  // (although strings are valid according to the JavaScript specification):
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/forms
  return document.forms[formName as any][elementName];
}