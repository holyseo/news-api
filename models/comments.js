const db = require("../db/connection");

exports.addCommentsById = (id, commentBody) => {
  if (commentBody.body === "" || commentBody.author === "") {
    return Promise.reject({ status: 400, msg: "invalid input" });
  }
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *; `,
      [commentBody.author, commentBody.body, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
