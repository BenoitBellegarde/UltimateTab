import { useEffect, useRef } from 'react'
import { ChordBox } from 'vexchords'

export default function ChordDiagram({ label, notes }) {
  const chordRef = useRef(null)

  useEffect(() => {
    const chord = new ChordBox(chordRef.current, {
      width: 200,
      height: 240,
    })

    chord.draw({
      chord: notes,
    })
  })

  return (
    <div className="chord-diagram">
      <h3>{label}</h3>
      <div ref={chordRef}></div>
    </div>
  )
}
