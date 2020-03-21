require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  DATA_REPOSITORY: process.env.DATA_REPOSITORY,
  CRONTAB: process.env.CRONTAB
}