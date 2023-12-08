
// Parses query strings like where, sort, select, skip, limit, and count
function parseQuery(query) {
    const result = {};
    if (query.where) {
      result.where = JSON.parse(query.where);
    }
    if (query.sort) {
      result.sort = JSON.parse(query.sort);
    }
    if (query.select) {
      result.select = JSON.parse(query.select);
    }
    if (query.skip) {
      result.skip = parseInt(query.skip);
    }
    if (query.limit) {
      result.limit = parseInt(query.limit);
    }
    return result;
  }
  
  function applyQueryOptions(query, options) {
    if (options.where) {
      query = query.find(options.where);
    }
    if (options.sort) {
      query = query.sort(options.sort);
    }
    if (options.select) {
      query = query.select(options.select);
    }
    if (options.skip) {
      query = query.skip(options.skip);
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }
    return query;
  }
  
  module.exports = {
    parseQuery,
    applyQueryOptions
  };
  