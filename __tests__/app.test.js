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
        const endpoints = [
          "GET /api/topics",
          "GET /api",
          "GET /api/articles/:article_id",
          "GET /api/articles",
          "GET /api/articles/:article_id/comments",
          "POST /api/articles/:article_id/comments",
          "PATCH /api/articles/:article_id",
          "DELETE /api/comments/:comment_id",
          "GET /api/users",
          "GET /api/articles",
          "GET /api/articles/:article_id",
        ];
        const results = endpoints.some((end) => keys.includes(end));
        expect(results).toBe(true);
      });
  });
});
