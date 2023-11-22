const db = require("../db/connection");

exports.addCommentsById = (id, commentBody) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *; `,
      [commentBody.author, commentBody.body, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
