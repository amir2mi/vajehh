/**
 * Search for a string in the database with MongoDB Atlas client
 * @param {Object} database
 * @param {string} dict
 * @param {string | Array} value
 * @param {number} limit
 * @param {boolean} fuzzySearch
 * @returns {Promise<Array> | Promise<Error>}
 */
async function searchWord(database, dict, value, limit = 100, fuzzySearch = true) {
  const collection = database.collection(dict);

  if (!collection) reject("Database is not connected");

  // the basic config to search by
  const searchSettings = {
    query: value,
    path: {
      wildcard: "*",
    },
  };

  // if fuzzy search is enabled, add fuzzy search settings:
  // https://docs.atlas.mongodb.com/atlas-search/text/
  if (fuzzySearch) {
    searchSettings.fuzzy = {
      maxEdits: 2,
      prefixLength: 3,
    };
  }

  try {
    const result = await collection
      .aggregate([
        {
          $search: {
            index: dict,
            text: searchSettings,
          },
        },
      ])
      .limit(limit)
      .toArray();

    return result;
  } catch (err) {
    console.error("Error searching in the database", err);
    return err;
  }
}

module.exports = searchWord;
