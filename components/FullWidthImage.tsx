import {FunctionComponent, useState} from 'react'
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'

interface FullWidthImageProps {
  source: ImageSourcePropType
  // Maximale hoogte in dp. Standaard 45% van de schermhoogte.
  maxHeight?: number
  style?: StyleProp<ViewStyle>
}

const DEFAULT_RATIO = 16 / 9

// Toont een lokale afbeelding op de breedte van zijn ouder, in de juiste verhouding,
// maar nooit hoger dan maxHeight. Past dus binnen de randen van de app en vult het scherm niet.
const FullWidthImage: FunctionComponent<FullWidthImageProps> = ({source, maxHeight, style}) => {
  const {height: windowHeight} = useWindowDimensions()
  const [containerWidth, setContainerWidth] = useState(0)

  const resolved = Image.resolveAssetSource(source)
  const imageWidth = resolved?.width ?? 0
  const imageHeight = resolved?.height ?? 0
  const ratio = imageWidth > 0 && imageHeight > 0 ? imageWidth / imageHeight : DEFAULT_RATIO

  const heightLimit = maxHeight ?? windowHeight * 0.45
  const height = Math.min(containerWidth / ratio, heightLimit)

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }

  return (
    <View style={[{width: '100%', alignItems: 'center'}, style]} onLayout={onLayout}>
      {containerWidth > 0 && (
        <Image source={source} style={{width: containerWidth, height}} resizeMode="contain" />
      )}
    </View>
  )
}

export default FullWidthImage