const db_host = process.env.DB_HOST
const db = process.env.DB
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

module.exports = {
  DB_URL: `mongodb://${db_user}:${db_pass}@${db_host}/${db}`,
}
