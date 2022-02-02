const Fuse = require("fuse.js");

const options = {
  exact: {
    threshold: 0.2,
    findAllMatches: true,
    includeMatches: true,
    useExtendedSearch: true,
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

function searcher(haystack, needle, type) {
  let exactSearcher = new Fuse(haystack.items, options.exact);
  let weakSearcher = new Fuse(haystack.items, options.weak);

  const finalResult = {
    kind: haystack.kind || "unknown",
    type: "exact", // by default, the type is exact until it comes to be weak
  };

  // Exact search by title
  if (type !== "weak") {
    // search by titles
    const exactResult = exactSearcher.search(needle);
    finalResult.items = exactResult;

    if (exactResult && exactResult.length > 0) return finalResult;
  }

  // Weak search by title & definition
  if (type !== "exact") {
    // if no result found based on title, include [definition] as well and search again
    const weakResult = weakSearcher.search(needle);

    finalResult.items = weakResult;
    finalResult.type = "weak";
    return finalResult;
  }

  exactSearcher = null;
  weakSearcher = null;
}

module.exports = searcher;
