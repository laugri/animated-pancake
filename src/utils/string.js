export function escapeRegExp(string: string): string {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

export function replaceAll(
  string: string,
  findCharacters: string,
  replaceWith: string
): string {
  return string.replace(
    new RegExp(escapeRegExp(findCharacters), 'g'),
    replaceWith
  );
}
