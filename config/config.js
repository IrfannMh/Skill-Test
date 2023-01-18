module.exports = {
  "development": {
    "username": process.env.DB_USERNAME||"irfannmmh",
    "password": process.env.DB_PASSWORD||"Irfan0809",
    "database": "skill_test_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
