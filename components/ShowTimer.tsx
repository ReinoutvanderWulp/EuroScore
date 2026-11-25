import {FunctionComponent, useEffect, useState} from 'react'
import {differenceInHours, differenceInSeconds} from 'date-fns'
import StyledText from '@/components/StyledText'
import {Badge, BadgeText} from '@/components/ui/badge'
import {Card} from '@/components/ui/card'
import {Heading} from '@/components/ui/heading'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {VStack} from '@/components/ui/vstack'

interface ShowTimerProps {
  title: string
  eventDate: Date
  showDuration: number
}

interface TimeTileProps {
  value: number
  label: string
}

const TimeTile: FunctionComponent<TimeTileProps> = ({value, label}) => (
  <VStack className="flex-1 items-center rounded-2xl border border-outline-200 bg-background-50 py-3">
    <Heading size="2xl" className="text-black">
      {String(value).padStart(2, '0')}
    </Heading>
    <Text size="xs" className="uppercase text-black">
      {label}
    </Text>
  </VStack>
)

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
      <VStack space="md" className="mb-3 mt-4">
        <Heading size="md" className="text-black">
          {title}
        </Heading>
        <HStack space="sm">
          <TimeTile value={days} label="days" />
          <TimeTile value={hours} label="hours" />
          <TimeTile value={minutes} label="min" />
          <TimeTile value={seconds} label="sec" />
        </HStack>
      </VStack>
    )
  }

  const hoursSinceStart = differenceInHours(currentTime, eventDate)

  if (hoursSinceStart < showDuration) {
    return (
      <Card variant="elevated" className="mb-3 mt-4 rounded-2xl">
        <VStack space="sm">
          <Heading size="md" className="text-black">
            {title}
          </Heading>
          <HStack space="sm" className="items-center">
            <Badge action="error" variant="solid">
              <BadgeText>LIVE NOW</BadgeText>
            </Badge>
            <StyledText>The show has begun! 🎉</StyledText>
          </HStack>
        </VStack>
      </Card>
    )
  }

  return (
    <Card variant="elevated" className="mb-3 mt-4 rounded-2xl">
      <VStack space="sm">
        <Heading size="md" className="text-black">
          {title}
        </Heading>
        <StyledText>You can rewatch the event on Eurovision's Youtube!</StyledText>
      </VStack>
    </Card>
  )
}

export default ShowTimer
