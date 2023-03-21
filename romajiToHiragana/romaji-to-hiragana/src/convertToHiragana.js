const romaji = require('romaji');

function convertToHiragana(input) {
  return romaji.toHiragana(input);
}

export default convertToHiragana;