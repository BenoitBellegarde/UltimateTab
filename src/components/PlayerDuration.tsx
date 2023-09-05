export default function Duration({
  seconds,
}: {
  seconds: number
}): JSX.Element {
  const format = (seconds: number) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  }

  const pad = (time: number) => ('0' + time).slice(-2)

  return <time dateTime={`P${Math.round(seconds)}S`}>{format(seconds)}</time>
}
