// @flow

export function encodeFileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Flow only expects reader.result to be an ArrayBuffer, but is a string here.
      // $ExpectError
      resolve(reader.result);
    };
    reader.onerror = error => reject(error);
  });
}
