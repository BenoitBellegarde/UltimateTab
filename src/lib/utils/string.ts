export function underscore(string) {
  let underscored = string[0].toLowerCase()
  return (
    underscored +
    string.slice(1, string.length).replace(/([A-Z])/g, (match) => {
      return '_' + match.toLowerCase()
    })
  )
}
