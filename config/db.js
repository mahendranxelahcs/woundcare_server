const sql = require("mssql");

const config = {
  user: "xelauser",
  password: "Test@1234",
  server: "20.46.232.18", // e.g., localhost or Azure SQL name
  database: "SmartSolutionsAI",
  options: {
    encrypt: true, // use false if local SQL Server without SSL
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
  sql, pool, poolConnect
};
