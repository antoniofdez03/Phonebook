const morgan = require('morgan')

morgan.token('body', (request) =>
  request.method === 'POST' ? JSON.stringify(request.body) : ''
)

const morganLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
)

module.exports = morganLogger