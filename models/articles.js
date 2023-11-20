const db = require("../db/connection");

exports.selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM ARTICLES WHERE article_id=$1`, [id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectAllArticles = () => {
  return db.query(`SELECT * FROM ARTICLES ;`).then(({ rows }) => {
    return rows;
  });
};
