const db = require("../config/db");
const generateUUID = require("../utils/generateUUID.js");

const createTableUsers = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
    )
    `;

  await db.query(sql);
};

const findUserByEmail = async (email) => {
  const normalized = email.trim().toLowerCase();
  const user1 = await db.query("SELECT * FROM users WHERE email = ?", [
    normalized,
  ]);

  return user1[0];
};

const findUserByName = async (name) => {
   const normalized = name.trim().toLowerCase();
   const user2 = await db.query("SELECT * FROM users WHERE name = ?", [
      normalized,
   ]);

   return user2[0];
};

const createUser = async (name, email, password) => {
  const id = generateUUID();

  const user = await db.query(
    "INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)",
    [id, name, email, password]
  );

  return user;
};

module.exports = { createTableUsers, findUserByEmail, findUserByName, createUser };
