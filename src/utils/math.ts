export const gcd = (a: number, b: number): number => {
  return b ? gcd(b, a % b) : a;
}

export const dec2frac = (dec: number): [number, number] => {
  let num = dec;
  let den = 1;
  let maxIter = 20;
  while(Math.floor(num) !== num && maxIter > 0) {
    den *= 10;
    num *= 10;
    maxIter--;
  }

  const common = gcd(num, den);
  num /= common;
  den /= common;

  return [num, den]
}