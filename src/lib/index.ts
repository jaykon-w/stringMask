const tokens = {
  '0': { pattern: /\d/ },
  $: { pattern: /./ },
  A: { pattern: /[a-zA-Z0-9]/ },
  S: { pattern: /[a-zA-Z]/ },
  U: {
    pattern: /[a-zA-Z]/,
    transform: e => e.toLocaleUpperCase()
  },
  L: {
    pattern: /[a-zA-Z]/,
    transform: e => e.toLocaleLowerCase()
  }
};

const validTokens = Object.keys(tokens);

export const stringMask = (pattern: string, ignoreCharacter: ((value: string) => string) | RegExp = val => val) => (val: string) => {
  val = typeof ignoreCharacter === 'function' ? ignoreCharacter(val) : val.replace(ignoreCharacter, '');
  const str = val.split('');
  const wildcard = pattern[pattern.length - 1] === '$';
  const lastPattern = wildcard ? pattern[pattern.length - 2] : pattern[pattern.length - 1];
  const length = wildcard ? str.length : pattern.length;

  let inc = 0;
  let hash = '';

  for (let i = -1; ++i < length; ) {
    if (validTokens.indexOf(pattern[i] || lastPattern) < 0) {
      hash += pattern[i] || lastPattern;
      if (i + 1 == length) {
        str[inc - 1] += hash;
        hash = '';
      }
    } else {
      const pos = inc++;
      const tokenValid = tokens[pattern[i] || lastPattern];

      if (!str[inc - 1]) {
        hash = '';
        break;
      }

      if (!tokenValid.pattern.test(str[inc - 1])) {
        str[inc - 1] = hash;
        hash = '';
        continue;
      }

      str[inc - 1] = hash + ((tokenValid.transform && tokenValid.transform(str[pos])) || str[pos]);
      hash = '';
    }
  }
  return str.join('').substring(0, length) + hash;
};
