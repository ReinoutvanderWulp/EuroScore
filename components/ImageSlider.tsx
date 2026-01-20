import {Dimensions, StyleSheet, View, Image, ImageSourcePropType} from 'react-native'
import {FunctionComponent} from 'react'
import Carousel from 'react-native-reanimated-carousel/src/components/Carousel'

const {width} = Dimensions.get('window');

interface ImageSliderProps {
  images: ImageSourcePropType[]
}

const ImageSlider: FunctionComponent<ImageSliderProps> = ({images}) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    }
  })

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image
              source={item}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  )
}

export default ImageSlider
