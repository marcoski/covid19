const { createLogger, format, transports } = require('winston')
const chalk = require('chalk')
const { combine, colorize, label, printf, splat, timestamp } = format

const getLevel = () => {
  if(process.env.NODE_ENV === 'development') return { level: 'debug', silent: false }
  if(process.env.NODE_ENV === 'test') return { level: 'emerg', silent: true }
  return { level: 'info', silent: false }
}

const { level, silent } = getLevel()

const logFormat = loggerLabel => combine(
  timestamp(),
  splat(),
  colorize(),
  label({ label: loggerLabel }),
  printf(info => `${info.timestamp} ${chalk.cyan(info.label)} ${info.level}: ${info.message}`)
)

const createLoggerWithLabel = label => createLogger({
  level,
  silent,
  transports: [new transports.Console({})],
  format: logFormat(label)
})

module.exports = {
  http: createLoggerWithLabel('[http]'),
  git: createLoggerWithLabel('[git]'),
  createLoggerWithLabel
}