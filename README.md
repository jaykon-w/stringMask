# Stringmask-js

[![https://nodei.co/npm/stringmask-js.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/stringmask-js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/stringmask-js)

A tiny javascript library to mask strings

## Instalation

```
npm i stringmask-js -s
```

or

```
yarn add stringmask-js
```

### Examples

#### Phone number

```js
stringmask('(00) 0000-00000')('12726323132') // (12) 7263-23132
```

#### Only numbers

```js
stringmask('0$')('12312312W') // 12312312
```

#### Date

```js
stringmask('0000-00-00')('19981001') // 1998-10-01
```

#### CPF

```js
stringmask('000.000.000-00')('12345678910') // 123.456.789-10
```

### Special Characteres

- 0 - Numbers
- $ - Any caractere (if is the last charactere it will repeat the previous Special Character forever)
- A - Alphanumerics
- S - Letters
- U - Letters (it will transform any letter to upper case)
- L - Letters (it will transform any letter to lower case)