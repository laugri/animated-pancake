import { replaceAll, escapeRegExp } from './string.js';

describe('string utils', () => {
  describe('replaceAll', () => {
    test('should replace all occurences of specified string', () => {
      expect(replaceAll('hey-you', '-', ' ')).toEqual('hey you');
      expect(replaceAll('.hey.you', '.', ' ')).toEqual(' hey you');
    });
  });

  describe('escapeRegExp', () => {
    test('should escape regexp meta characters', () => {
      expect(escapeRegExp('.')).toEqual('\\.');
      expect(escapeRegExp('-')).toEqual('-');
    });
  });
});
