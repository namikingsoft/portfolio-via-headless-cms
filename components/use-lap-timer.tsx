import { useEffect, useState, useRef } from 'react'

const useLapTimer = <Lap extends string>(
  lapRecord: Record<Lap, number>,
): Record<Lap, boolean> => {
  const laps = Object.keys(lapRecord) as Lap[]
  const initialLapPassed = laps.reduce((acc, lap) => {
    acc[lap] = false
    return acc
  }, {} as Record<Lap, boolean>)

  const lapPassedRef = useRef(initialLapPassed)
  const [lapPassed, setLapPassed] = useState(initialLapPassed)

  useEffect(() => {
    const tids: number[] = []

    laps.forEach((lap) => {
      tids.push(
        window.setTimeout(() => {
          lapPassedRef.current[lap] = true
          setLapPassed({ ...lapPassedRef.current })
        }, lapRecord[lap]),
      )
    })

    return () => {
      tids.forEach((tid) => window.clearTimeout(tid))
    }
  }, [])

  return lapPassed
}

export default useLapTimer
