import {useEurovisionNotifications} from "@/hooks/useEurovisionNotifications";
import {grandFinal} from "@/utils/dates";
import {FunctionComponent} from 'react'

const EurovisionNotifications: FunctionComponent = () => {
    useEurovisionNotifications([
      {title: 'The Grand Final 🏆', date: grandFinal},
    ])
    return null
}

export default EurovisionNotifications
