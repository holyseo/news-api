const db = require("../db/connection");

exports.selectArticleByTopic = (topic) => {
  return db
    .query(`SELECT * FROM articles WHERE LOWER(topic) = LOWER($1) ; `, [topic])
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE LOWER(slug) = LOWER($1)`, [topic])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "topic not found" });
      }
    });
};

exports.modifyVotesByArticleId = (id, votesValue) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING * ;`,
      [votesValue, +id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      return `Vote has been updated: ${rows[0].votes}`;
    });
};

exports.selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM ARTICLES WHERE article_id=$1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
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
