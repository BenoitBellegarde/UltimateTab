import { useState, useLayoutEffect } from 'react'

export default function useWindowSize(): number[] {
  const [size, setSize] = useState([
    typeof document !== 'undefined' ? window.innerWidth : 0,
    typeof document !== 'undefined' ? window.innerHeight : 0,
  ])
  const [debouncedSize, setDebouncedSize] = useState(size)

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout

    function updateSize() {
      clearTimeout(timeoutId)
      const newSize = [window.innerWidth, window.innerHeight]
      timeoutId = setTimeout(() => {
        setDebouncedSize(newSize)
      }, 500)
    }

    window.addEventListener('resize', updateSize)

    // Initial update
    updateSize()

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return debouncedSize
}
