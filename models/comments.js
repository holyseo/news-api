const db = require("../db/connection");

exports.addCommentsById = (author, body, id) => {
  console.log(author, body, id);
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3); `,
      [author, body, id]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};
