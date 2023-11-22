const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const jsonEndpoints = require("../endpoints.json");
const sorted = require("jest-sorted");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("GET/api/topics", () => {
  it("GET:200 status with an array of all topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});

describe("GET/api", () => {
  it("provide a description of all other endpoints available", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const keys = Object.keys(body);
        const endpoints = Object.keys(jsonEndpoints);
        const results = endpoints.some((end) => keys.includes(end));
        expect(results).toBe(true);
        for (let i = 0; i < keys.length; i++) {
          expect(keys[i]).toBe(endpoints[i]);
        }
      });
  });
});

describe("GET/api/articles/:article_id", () => {
  it("status 200 - get an article by its id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.article_id).toBe(1);
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
  it("status 404 - requests valid id but it doesn't exists", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "article not found" });
      });
  });
  it("status 404 - requests id with wrong data type", () => {
    return request(app)
      .get("/api/articles/invalidrequest")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "invalid request" });
      });
  });
});

describe("GET/api/articles", () => {
  it("get all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  it("status 200 - returns articles ordered by created_at", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET/api/articles/:article_id/comments", () => {
  it("status 200 - get all comments for an article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toHaveLength(11);
        expect(comments).toBeSortedBy("created_at", { descending: true });
        comments.forEach((comment) => {
          expect(comment.article_id).toBe(1);
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
      });
  });
  it("status 404: responds with an error message when an article_id is invalid", () => {
    return request(app)
      .get("/api/articles/invalidId/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid request");
      });
  });
  it("status 404: responds with an error message when an article does not exist", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("article not found");
      });
  });
  it("status 200: responds with no comments although an article exists", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.comments).toEqual([]);
      });
  });
});
