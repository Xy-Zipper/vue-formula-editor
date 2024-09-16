function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomArray(length, min, max) {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push(generateRandomNumber(min, max))
  }
  return result
}

export function generateRandomData(dataType, options) {
  const { length = 10, min = 0, max = 100 } = options || {}
  switch (dataType) {
    case 'string':
      return generateRandomString(length)
    case 'number':
      return generateRandomNumber(min, max)
    case 'array':
      return generateRandomArray(length, min, max)
    default:
      throw new Error('Invalid data type')
  }
}
