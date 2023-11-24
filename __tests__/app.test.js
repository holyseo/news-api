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
const { selectAllComments } = require("../models/comments");

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
  it("status 400: responds with an error message when an article_id is invalid", () => {
    return request(app)
      .get("/api/articles/invalidId/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid request");
      });
  });
  it("status 400: responds with an error message when an article does not exist", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article not found");
      });
  });
  it("status 200: responds with no comments although an article exists", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});

describe("POST/api/articles/:article_id/comments", () => {
  it("201 status - add a comment for an article", () => {
    const sample = {
      body: "body for a new comment",
      author: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/13/comments")
      .send(sample)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toMatchObject({
          body: expect.any(String),
          author: expect.any(String),
          comment_id: 19,
        });
      });
  });
  it("400 status - request with an invalid article_id", () => {
    const sample = {
      body: "body for a new comment",
      author: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/invalidId/comments")
      .send(sample)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid request");
      });
  });
  it("404 status - request with an non-existing article_id", () => {
    const sample = {
      body: "body for a new comment",
      author: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/99/comments")
      .send(sample)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid content");
      });
  });
  it("404 status - requests with non-existing username", () => {
    const sample = {
      body: "body for a new comment",
      author: "nonExistingUsername",
    };
    return request(app)
      .post("/api/articles/13/comments")
      .send(sample)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid content");
      });
  });
  it("400 status - requests with missing values in body input", () => {
    const sample = {
      body: "",
      author: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/13/comments")
      .send(sample)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      });
  });
  it("400 status - requests with missing values in username input", () => {
    const sample = {
      body: "body for a new comment",
      author: "",
    };
    return request(app)
      .post("/api/articles/13/comments")
      .send(sample)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input");
      });
  });
  it("201 status - add a comment for an article with extra information on the body", () => {
    const sample = {
      body: "body for a new comment",
      author: "butter_bridge",
      votes: 100,
    };
    return request(app)
      .post("/api/articles/13/comments")
      .send(sample)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toMatchObject({
          body: expect.any(String),
          author: expect.any(String),
          comment_id: 19,
        });
      });
  });
});
describe("PATCH/api/articles/:article_id", () => {
  it("200 status - update votes with a value of an object", () => {
    const increaseVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/1")
      .send(increaseVote)
      .expect(200)
      .then(({ body }) => {
        const { vote } = body;
        expect(vote).toBe(`Vote has been updated: ${101}`);
      });
  });
  it("200 status - update votes with a value of an object", () => {
    const decreaseVote = { inc_votes: -100 };
    return request(app)
      .patch("/api/articles/1")
      .send(decreaseVote)
      .expect(200)
      .then(({ body }) => {
        const { vote } = body;
        expect(vote).toBe(`Vote has been updated: ${0}`);
      });
  });
  it("400 status - missing votes value from an object", () => {
    const increaseVote = { inc_votes: "" };
    return request(app)
      .patch("/api/articles/1")
      .send(increaseVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid request");
      });
  });
  it("400 status - invalid data type of votes value from an object", () => {
    const increaseVote = { inc_votes: "invalid" };
    return request(app)
      .patch("/api/articles/1")
      .send(increaseVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid request");
      });
  });
  it("400 status - invalid article_id in the url", () => {
    const increaseVote = { inc_votes: "invalid" };
    return request(app)
      .patch("/api/articles/invalidId")
      .send(increaseVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid request");
      });
  });
  it("404 status - valid but non-existing article_id in the url", () => {
    const increaseVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/99")
      .send(increaseVote)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article not found");
      });
  });
});

describe("DELETE/api/comments/:comment_id", () => {
  it("204 status - delete the given comment by comment_id ", () => {
    return request(app)
      .delete("/api/comments/5")
      .expect(204)
      .then(() => {
        return selectAllComments().then((comments) => {
          expect(comments).toBe(17);
        });
      });
  });
  it("404 status - requests valid but non-existing comment_id in the url", () => {
    return request(app)
      .delete("/api/comments/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("comment not found");
      });
  });
  it("400 status - requests invalid comment_id in the url", () => {
    return request(app)
      .delete("/api/comments/invalidComment")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid request");
      });
  });
});

describe("GET/api/users", () => {
  it("status 200 - get all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});
