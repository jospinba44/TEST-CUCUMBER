const { createPool } = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();
var globalPool = undefined;
const connection = async () => {
  try {
    if (globalPool) return globalPool;
    globalPool = await createPool({
      host: process.env.BD_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "cucumber_test",
      port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    return globalPool;
  } catch (error) {
    throw error;
  }
};

const query = async (query, values) => {
  const pool = await connection();
  return (await pool.query(query, values))[0];
};

module.exports = {
  connection,
  query,
};
