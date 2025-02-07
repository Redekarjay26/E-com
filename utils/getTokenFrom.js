export const getTokenForm = async (req) => {
  const hederToken = req?.headers?.authorization?.split(' ')[1]
  if (hederToken === undefined) {
    return 'No token found in the header'
  } else {
    return hederToken
  }
}
