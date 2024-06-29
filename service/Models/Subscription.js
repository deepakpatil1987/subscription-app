const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Function to retrieve subscriptions by userId
const getSubscriptions = async (userId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM subscriptions WHERE userId = ?",
      [userId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// Function to create a new subscription
const createSubscription = async (userId, planId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO subscriptions (userId, planId) VALUES (?, ?)",
      [userId, planId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, userId, planId });
        }
      }
    );
  });
};

// Function to update an existing subscription
const updateSubscription = async (subscriptionId, userId, planId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE subscriptions SET planId = ? WHERE id = ? AND userId = ?",
      [planId, subscriptionId, userId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes > 0) {
            resolve({ id: subscriptionId, userId, planId });
          } else {
            resolve(null); // Subscription not found
          }
        }
      }
    );
  });
};

// Function to delete a subscription
const deleteSubscription = async (subscriptionId, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM subscriptions WHERE id = ? AND userId = ?",
      [subscriptionId, userId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes > 0) {
            resolve({ message: "Subscription deleted successfully" });
          } else {
            resolve(null); // Subscription not found
          }
        }
      }
    );
  });
};

module.exports = {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
