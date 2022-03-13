/**
 * Prune the input and create an array of words
 * @param {string} value
 * @returns {Array} An array of words separated by & ، , * +
 */
function sanitizeText(value) {
  value = String(value);

  // Prune letters that does not help to improve the search
  // source: https://github.com/kokabi1365/Vajehdan/blob/master/src/Vajehdan/Helper.cs#L82
  value = value
    .replace(/\u064B/g, "") // ـً
    .replace(/\u064C/g, "") // ـٌ
    .replace(/\u064D/g, "") // ـٍ
    .replace(/\u064E/g, "") // ـَ
    .replace(/\u064F/g, "") // ـُ
    .replace(/\u0650/g, "") // ـِ
    .replace(/\u0651/g, "") // ـّ
    .replace(/\u0652/g, "") // ـْ
    .replace(/\u0654/g, "") // ـٔ
    .replace(/\u0647\u0654/g, "ه") // هٔ in standard persian keyboard
    .replace(/\u06c0/g, "ه") // ۀ in non-standard persian keyboard
    .replace(/ـ/g, "")
    .replace(/ة/g, "ه")
    .replace(/ك/g, "ک")
    .replace(/ي/g, "ی")
    .replace(/ؤ/g, "و")
    .replace(/أ/g, "ا")
    .replace(/إ/g, "ا");

  // separate words by & ، , * +
  // remove empty words
  // trim spaces
  value = value.split(/&|،|,|\+/).filter((word) => word && word.trim());

  return value;
}

module.exports = sanitizeText;
