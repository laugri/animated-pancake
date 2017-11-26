// @flow

export function encodeFileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Flow thinks reader.result is am ArrayBuffer but is a string
      // $ExpectError
      resolve(reader.result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
}
