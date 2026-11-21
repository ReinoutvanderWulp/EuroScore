import {FunctionComponent, useState} from 'react'
import {Linking, Pressable, StyleSheet, View} from 'react-native'
import {WebView, type WebViewMessageEvent} from 'react-native-webview'
import StyledText from '@/components/StyledText'
import StyledTitle from '@/components/StyledTitle'

// Controleer of dit het officiële account is
const INSTAGRAM_USERNAME = 'eurovision'
const BASE_URL = 'https://www.instagram.com'
const PROFILE_URL = `${BASE_URL}/${INSTAGRAM_USERNAME}/`
const MIN_HEIGHT = 360
const MAX_HEIGHT = 1400

// Officiële embedcode van Instagram voor een profiel
const EMBED_HTML = `<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>html, body { margin: 0; padding: 0; background: #ffffff; }</style>
</head>
<body>
<blockquote class="instagram-media"
  data-instgrm-permalink="${PROFILE_URL}?utm_source=ig_embed&amp;utm_campaign=loading"
  data-instgrm-version="14"
  style="background:#fff; border:0; margin:0 auto; max-width:540px; min-width:280px; width:100%;">
  <a href="${PROFILE_URL}" target="_blank">View on Instagram</a>
</blockquote>
<script async src="${BASE_URL}/embed.js"></script>
</body>
</html>`

// Meet de hoogte van de embed een paar keer, zodat het vlak er precies omheen past
const MEASURE_SCRIPT = `
  (function () {
    var runs = 0;
    var timer = setInterval(function () {
      window.ReactNativeWebView.postMessage(String(document.documentElement.scrollHeight));
      runs += 1;
      if (runs > 20) clearInterval(timer);
    }, 500);
  })();
  true;
`

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 24,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#008000',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
})

const InstagramFeed: FunctionComponent = () => {
  const [height, setHeight] = useState(MIN_HEIGHT)

  const onMessage = (event: WebViewMessageEvent) => {
    const measured = Number(event.nativeEvent.data)
    if (Number.isFinite(measured)) {
      setHeight(Math.min(Math.max(measured, MIN_HEIGHT), MAX_HEIGHT))
    }
  }

  // Alleen de embed zelf mag in de WebView laden. Links naar posts en profielen
  // openen in de Instagram-app of de browser.
  const allowRequest = (request: {url: string}): boolean => {
    const {url} = request
    const isBasePage = url.replace(/\/$/, '') === BASE_URL
    const isInstagramPage = url.startsWith(`${BASE_URL}/`) && !url.includes('/embed')

    if (isInstagramPage && !isBasePage) {
      void Linking.openURL(url)
      return false
    }
    return true
  }

  return (
    <View style={styles.container}>
      <StyledTitle>Follow Eurovision on Instagram</StyledTitle>
      <View style={{height}}>
        <WebView
          originWhitelist={['*']}
          source={{html: EMBED_HTML, baseUrl: BASE_URL}}
          injectedJavaScript={MEASURE_SCRIPT}
          onMessage={onMessage}
          onShouldStartLoadWithRequest={allowRequest}
          scrollEnabled={false}
          javaScriptEnabled
          domStorageEnabled
        />
      </View>
      <Pressable
        onPress={() => void Linking.openURL(PROFILE_URL)}
        style={styles.button}
        accessibilityRole="link">
        <StyledText style={styles.buttonText}>Open @{INSTAGRAM_USERNAME} on Instagram</StyledText>
      </Pressable>
    </View>
  )
}

export default InstagramFeed