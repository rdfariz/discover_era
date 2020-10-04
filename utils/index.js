export const paginate = (array, index, size) => {
  // transform values
  index = Math.abs(parseInt(index))
  index = index > 0 ? index - 1 : index
  size = parseInt(size)
  size = size < 1 ? 1 : size

  // filter
  return [...(array.filter((value, n) => {
    return (n >= (index * size)) && (n < ((index + 1) * size))
  }))]
}
