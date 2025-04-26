const sqlite = require('sqlite3')
const path = require("path");
const paginate = require("../utils/pagination");

const dbPath = path.join(__dirname, "../db/branches.db");

exports.getBranches = (req, res) => {
  let {
    searchBy,
    searchValue,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10,
  } = req.query;
  sortOrder = sortOrder || "asc";
  page = parseInt(page);
  limit = parseInt(limit);

  const db = new sqlite.Database(dbPath)

  let query = `SELECT * FROM branches`
  let conditions = []
  let params = []

  if (searchBy && searchValue) {
    conditions.push(`${searchBy} LIKE ?`);
    params.push(`%${searchValue}%`);
  }

  if(conditions.length > 0){
    query += `WHERE` + conditions.join('AND')
  }

  if(sortBy){
    query += `ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`
  }

  db.all(query, params, (err, rows) => {
    if(err){
      console.log(err)
      res.status(500).json({
        error: 'Database error'
      })
      return
    }

    const paginatedResult = paginate(rows, page, limit)
    res.status(200).json(paginatedResult)
    return
  })

  db.close();
};
