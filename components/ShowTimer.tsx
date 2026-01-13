import {FunctionComponent, useEffect, useState} from 'react'
import {differenceInSeconds} from 'date-fns'

interface ShowTimerProps {
  title: string
  eventDate: Date
  rewatchTime: number
}

const ShowTimer: FunctionComponent<ShowTimerProps> = ({title, eventDate, rewatchTime}) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const timeLeft = differenceInSeconds(eventDate, currentTime)

  

  return (
    <></>
  )
}

export default ShowTimer
