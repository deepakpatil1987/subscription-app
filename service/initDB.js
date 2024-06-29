//initDB.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./database.sqlite');

const schema = fs.readFileSync('./schema.sql', 'utf-8');

db.exec(schema, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database schema applied successfully.');
  }
  db.close();
});
