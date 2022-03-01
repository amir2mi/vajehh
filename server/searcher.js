/**
 * Search for a string in the database with MongoDB Atlas client
 * @param {Object} database
 * @param {string} dict
 * @param {string | Array} value
 * @param {number} limit
 * @param {boolean} fuzzySearch
 * @param {number} fuzzyLevel [1,2,3] 1 = more fuzzy, 3 = less fuzzy
 * @returns {Promise<Array> | Promise<Error>}
 */
async function searchWord(database, dict, value, limit = 100, fuzzySearch = true, fuzzyLevel = 3) {
  const collection = database.collection(dict);

  if (!collection) reject("Database is not connected");
  if (!value || value.length === 0) reject("searchWord requires a value");

  // the basic config to search by
  const searchSettings = {
    query: value,
    path: {
      wildcard: "*",
    },
    fuzzy: {
      maxEdits: fuzzySearch ? 2 : 1,
      prefixLength: fuzzyLevel,
    },
  };

  try {
    const result = await collection
      .aggregate([
        {
          $search: {
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
