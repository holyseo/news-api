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
  it("get an article by its id", () => {
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
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

xdescribe("POST/api/articles/:article_id/comments", () => {
  it("201 status - add a comment for an article", () => {
    const sample = {
      body: "comments body test test test...",
      author: "username_test",
    };
    const expected = {
      body: "comments body test test test...",
      votes: 5,
      author: "username_test",
      article_id: 1,
      created_at: 1586179090000,
    };
    return request(app)
      .post("/api/articles/15/comments")
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment.article_id).toBe(1);
        expect(sample).toMatchObject(expected);
      });
  });
});
