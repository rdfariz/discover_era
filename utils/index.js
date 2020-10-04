export const getPagingLength = (perPage, total) => {
  return Math.ceil(total / perPage)
}
