class NotFoundError extends Error{
  constructor(message) {
    super(message)
    this.status = 404
  }
}

class HttpError extends Error {
  constructor(message) {
    super(message)
    this.status = 500
  }
}


module.exports = { NotFoundError, HttpError }
