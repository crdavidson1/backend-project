const format = require('pg-format');
const db = require('../connection');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('./utils');

const seed = ({ programData, articleData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS programs;`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
      CREATE TABLE programs (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        topic VARCHAR NOT NULL,
        learningFormats VARCHAR NOT NULL,
        bestseller BOOLEAN NOT NULL,
        startDate TIMESTAMP NOT NULL,
      );`);

      return Promise.all([topicsTablePromise, usersTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        topic VARCHAR NOT NULL REFERENCES topics(slug),
        author VARCHAR NOT NULL REFERENCES users(username),
        body VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        votes INT DEFAULT 0 NOT NULL,
        article_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
      );`);
    })
    .then(() => {
      const insertProgramsQueryStr = format(
        'INSERT INTO programs ( id, title, topic, learningFormats, bestseller, startDate) VALUES %L;',
        programData.map(({ id, title, topic, learningFormats, bestseller, startDate }) => [
          id,
          title,
          topic,
          learningFormats,
          bestseller,
          startDate
        ])
      );

      return db.query(insertProgramsQueryStr);
    })
    .then(() => {
      const formattedArticleData = articleData.map(convertTimestampToDate);
      const insertArticlesQueryStr = format(
        'INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;',
        formattedArticleData.map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            votes = 0,
            article_img_url,
          }) => [title, topic, author, body, created_at, votes, article_img_url]
        )
      );

      return db.query(insertArticlesQueryStr);
    })
};

module.exports = seed;
