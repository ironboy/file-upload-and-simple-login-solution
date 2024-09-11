// converts a chosen binary file, like an image,
// in a <input type="file"> element
// to base64 encoding, which is easy to send to a server
// (call this function asynchronously using await)
export default function fileToBase64(fileInputElement: HTMLInputElement) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL((fileInputElement.files || [])[0]);
    reader.onerror = () => reject();
    reader.onload = () => resolve(reader.result);
  });
}