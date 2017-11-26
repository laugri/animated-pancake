// @flow

export function encodeFileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Flow thinks reader.result is am ArrayBuffer but is a string
      // $ExpectError
      resolve(reader.result);
    };
    reader.onerror = error => reject(error);
  });
}

export function stripBase64Type(fileReaderEncodedFile: string): string {
  return fileReaderEncodedFile.split(',')[1];
}
