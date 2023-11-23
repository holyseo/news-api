const db = require("../db/connection");

exports.selectAllComments = () => {
  return db.query(`SELECT * FROM comments ;`).then(({ rows }) => {
    return rows.length;
  });
};

exports.removeCommentById = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING * `, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "invalid content" });
      }
      return rows[0];
    });
};

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

exports.selectCommentsByArticleId = (id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC ;`,
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkExists = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
    });
};
