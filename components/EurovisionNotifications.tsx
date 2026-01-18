import {useEurovisionNotifications} from "@/hooks/useEurovisionNotifications";
import {grandFinal, semiFinalOne, semiFinalTwo} from "@/utils/dates";
import {FunctionComponent} from 'react'

const EurovisionNotifications: FunctionComponent = () => {
    useEurovisionNotifications([
      {title: 'First Semi-Final 🎤', date: semiFinalOne},
      {title: 'Second Semi-Final 🎤', date: semiFinalTwo},
      {title: 'The Grand Final 🏆', date: grandFinal},
    ])
    return null
}

export default EurovisionNotifications
