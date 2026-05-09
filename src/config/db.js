const mysql = require("mysql2/promise")
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    ssl: {
    rejectUnauthorized: false
    }
})

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Db connected")
        connection.release();
    } catch (error) {
        console.error("Db connection failed", error.message)
        process.exit(1);
    }
}

testConnection();
module.exports = pool;