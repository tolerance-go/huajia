export function compareStrings(str1: string, str2: string): void {
  const len1 = str1.length;
  const len2 = str2.length;
  const minLen = Math.min(len1, len2);

  for (let i = 0; i < minLen; i++) {
    if (str1[i] !== str2[i]) {
      console.log(
        `字符不同：在位置 ${i}，字符串1的字符是 '${str1[i]}'，字符串2的字符是 '${str2[i]}'`
      );
    }
  }

  if (len1 > minLen) {
    for (let i = minLen; i < len1; i++) {
      console.log(
        `字符不同：在位置 ${i}，字符串1的字符是 '${str1[i]}'，字符串2在该位置没有字符`
      );
    }
  } else if (len2 > minLen) {
    for (let i = minLen; i < len2; i++) {
      console.log(
        `字符不同：在位置 ${i}，字符串2的字符是 '${str2[i]}'，字符串1在该位置没有字符`
      );
    }
  }
}
