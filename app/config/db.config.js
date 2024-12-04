module.exports = {
  HOST: "0.0.0.0",
  USER: "root",
  PASSWORD: "YES",
  DB: "courses",
  dialect: "mysql",
  PORT: 3307,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

console.log("DB Config:", {
  HOST: "0.0.0.0",
  USER: "root",
  PASSWORD: "YES",
  DB: "courses",
});
