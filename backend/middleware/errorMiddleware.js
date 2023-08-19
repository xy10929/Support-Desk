// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500
//   res.status(statusCode)
//   res.json({
//     messsage: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   })
// }

// module.exports = { errorHandler }

const errorHandler = (error, _, res, next) => {
  // FIX: check for bad status codes, if it's a good status code then we want to send
  // a bad status code i.e. 2xx should not be sent as error response
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode

  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  })
}

module.exports = { errorHandler }
