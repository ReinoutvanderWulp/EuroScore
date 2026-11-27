import {useColorScheme} from 'nativewind'

// Kleuren voor plekken waar je geen className kunt gebruiken (navigatie, Modal, iconen).
// Houd de achtergrond gelijk aan --color-background-0 in config.ts.
export const useThemeColors = () => {
  const {colorScheme} = useColorScheme()
  const isDark = colorScheme === 'dark'

  return {
    isDark,
    background: isDark ? '#121212' : '#ffffff',
    surface: isDark ? '#1e1e1e' : '#f5f5f5',
    text: isDark ? '#ffffff' : '#000000',
    muted: isDark ? '#a3a3a3' : '#555555',
    border: isDark ? '#404040' : '#cccccc',
  }
}