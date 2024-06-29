const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");
const bcrypt = require("bcrypt");

async function createUser(username, email, password) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password], // Store the hashed password directly
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, username, email });
        }
      }
    );
  });
}

async function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Row will be null if no user found
      }
    });
  });
}

async function verifyUserCredentials(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (!row) {
          resolve(null); // No user found
          return;
        }

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, row.password);
        console.log("Password valid:", isPasswordValid); // Log for debugging
        if (isPasswordValid) {
          resolve(row); // Passwords match
        } else {
          resolve(null); // Passwords don't match
        }
      }
    );
  });
}

async function updateUser(id, username, hashedPassword) {
  return new Promise((resolve, reject) => {
    const sql = hashedPassword
      ? "UPDATE users SET username = ?, password = ? WHERE id = ?"
      : "UPDATE users SET username = ? WHERE id = ?";
    const params = hashedPassword
      ? [username, hashedPassword, id]
      : [username, id];

    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, username });
      }
    });
  });
}

module.exports = {
  createUser,
  findUserByUsername,
  verifyUserCredentials,
  updateUser,
};
