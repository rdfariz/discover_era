function success (payload = {}, data = null, message = '', meta = {}) {
  return {
    code: payload.status,
    data,
    message,
    meta
  }
}

module.exports = {
  success
}
