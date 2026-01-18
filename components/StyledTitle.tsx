import {FunctionComponent} from "react";
import {StyleSheet, Text} from 'react-native'

interface StyledTitleProps {
    children?: React.ReactNode
}

const StyledTitle: FunctionComponent<StyledTitleProps> = ({children}) => {
    const styles = StyleSheet.create({
      title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
    })
    
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

export default StyledTitle
