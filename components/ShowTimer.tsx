import {FunctionComponent, useEffect, useState} from 'react'
import {differenceInHours, differenceInSeconds} from 'date-fns'
import {View} from 'react-native'
import StyledTitle from '@/components/StyledTitle'
import StyledText from '@/components/StyledText'

interface ShowTimerProps {
  title: string
  eventDate: Date
  showDuration: number
}

const ShowTimer: FunctionComponent<ShowTimerProps> = ({title, eventDate, showDuration}) => {
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const timeLeft = differenceInSeconds(eventDate, currentTime)

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / 86400)
    const hours = Math.floor((timeLeft % 86400) / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = Math.floor(timeLeft % 60)

    return (
      <View style={{marginBottom: 12}}>
        <StyledTitle>{title}</StyledTitle>
        <StyledText>{`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}</StyledText>
      </View>
    )
  }

  const hoursSinceStart = differenceInHours(currentTime, eventDate)

  if (hoursSinceStart < showDuration) {
    return (
      <View style={{marginBottom: 12}}>
        <StyledTitle>{title}</StyledTitle>
        <StyledText>{title} has begun!</StyledText>
      </View>
    )
  }

  return (
    <View style={{marginBottom: 12}}>
      <StyledTitle>{title}</StyledTitle>
      <StyledText>You can rewatch the event on Eurovision's Youtube!</StyledText>
    </View>
  )
}

export default ShowTimer
