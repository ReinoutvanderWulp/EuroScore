import {FunctionComponent} from "react";
import {Linking, Pressable, Text} from 'react-native'

interface LinkButtonProps {
    url: string | null
    songName: string
}

const LinkButton: FunctionComponent<LinkButtonProps> = ({url, songName}) => {
    if (!url){
        return (
            <Text>No spotify link available</Text>
        )
    }

    return (
        <Pressable onPress={() => Linking.openURL(url)}>
            <Text>Listen to {songName}</Text>
        </Pressable>
    )
}

export default LinkButton
