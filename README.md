# Northcoders News API

Welcome to my [News API](https://news-api-5rlq.onrender.com/api) project. This project is part of the Northcoders bootcamp, October 2023 to January 2024. The project aimed to replicate the back-end development approach used in creating a News API.

Skill sets used are as follows: 
- Node.js
- Express
- PostgreSQL
- Supertest
- Git

# Set-up instructions

## Install Node.js 

If you would like to clone my project and run it locally, please create two environment files, `.env.development` and `.env.test`  Then, include `PGDATABASE=nc_news` and `PGDATABASE=nc_news_test` for each file.


## Fork and clone this [repository](https://github.com/holyseo/news-api)
```bash
git clone https://github.com/holyseo/news-api
```

## Install dependencies
```bash
npm install -y
```

## Run the API in local environment
- Make sure PostgreSQL is installed and running
- Create the databases: `npm run setup-dbs`
- Seed the development database: `npm run seed-dev`
- In the browwser, navigate to `localhost://9090/api` to view a JSON file showing the avaiable endpoints
