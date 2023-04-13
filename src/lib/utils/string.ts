export function underscore(stringToModify: string): string {
  let underscored = stringToModify[0].toLowerCase()
  return (
    underscored +
    stringToModify
      .slice(1, stringToModify.length)
      .replace(/([A-Z])/g, (match) => {
        return '_' + match.toLowerCase()
      })
  )
}
