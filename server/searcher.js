const Fuse = require("fuse.js");

const options = {
  exact: {
    threshold: 0.2,
    findAllMatches: true,
    includeMatches: true,
    useExtendedSearch: true,
    ignoreLocation: true,
    keys: ["title"],
  },

  weak: {
    threshold: 0.2,
    findAllMatches: true,
    includeMatches: true,
    useExtendedSearch: true,
    keys: ["title", "definition"],
  },
};

function searcher(haystack, needle, type, customOptions) {
  const limit = customOptions ? customOptions.limit : 100;

  if (options) {
    options.exact = { ...options.exact, ...customOptions };
    options.weak = { ...options.weak, ...customOptions };
  }

  let exactSearcher = new Fuse(haystack.items, options.exact);
  let weakSearcher = new Fuse(haystack.items, options.weak);

  const finalResult = {
    kind: haystack.kind || "unknown",
    type: "exact", // by default, the type is exact until it comes to be weak
  };

  // Exact search by title
  if (type !== "weak") {
    // search by titles
    const exactResult = exactSearcher.search(needle, { limit });
    finalResult.items = exactResult;

    if (type === "exact" || (exactResult && exactResult.length > 0)) return finalResult;
  }

  // Weak search by title & definition
  if (type !== "exact") {
    // if no result found based on title, include [definition] as well and search again
    const weakResult = weakSearcher.search(needle, { limit });

    finalResult.items = weakResult;
    finalResult.type = "weak";
    return finalResult;
  }

  exactSearcher = null;
  weakSearcher = null;
}

module.exports = searcher;
