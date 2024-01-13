import { toDate, toLowerCase, toNumber } from './cast.helper';

describe('Cast Helper', () => {
  it('toLowerCase should convert to lower case', () => {
    expect(toLowerCase('ABC')).toBe('abc');
  });

  it('toDate should convert to date', () => {
    expect(toDate('2018-12-01')).toEqual(new Date('2018-12-01'));
  });

  it('toNumber should convert to number', () => {
    expect(toNumber('2018')).toBe(2018);
  });

  it('toNumber should return NaN', () => {
    expect(toNumber('abc')).toBe(NaN);
  });

  it('toNumber should return default value', () => {
    expect(
      toNumber('', {
        default: 10,
      }),
    ).toBe(10);
  });

  it('toNumber should use min value', () => {
    expect(
      toNumber('10', {
        min: 100,
      }),
    ).toBe(100);
  });

  it('toNumber should use max value', () => {
    expect(
      toNumber('100', {
        max: 10,
      }),
    ).toBe(10);
  });
});
