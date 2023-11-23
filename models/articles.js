const db = require("../db/connection");

exports.modifyVotesByArticleId = (id, votesValue) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING * ;`,
      [votesValue, +id]
    )
    .then(({ rows }) => {
      return rows[0].votes;
    });
};

exports.selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM ARTICLES WHERE article_id=$1 ;`, [id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectAllArticles = () => {
  return db
    .query(
      `SELECT
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      (SELECT COUNT(*)::Int FROM comments WHERE comments.article_id = articles.article_id) AS comment_count 
      FROM articles 
      ORDER BY articles.created_at DESC;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};
