import {FunctionComponent, useState} from 'react'
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native'
import {router} from 'expo-router'
import {Settings} from 'lucide-react-native'
import BottomSheet from '@/components/BottomSheet'
import {useAuth} from '@/context/AuthContext'
import {ThemePreference, useThemePreference} from '@/context/ThemeContext'
import {useThemeColors} from '@/hooks/useThemeColors'

const THEME_OPTIONS: {value: ThemePreference; label: string}[] = [
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
  {value: 'system', label: 'System'},
]

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  segments: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  segment: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  row: {
    height: 52,
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    fontSize: 16,
  },
  danger: {
    color: '#d32f2f',
  },
})

const LogoutButton: FunctionComponent = () => {
  const {user, logOut} = useAuth()
  const {preference, setPreference} = useThemePreference()
  const colors = useThemeColors()
  const [open, setOpen] = useState(false)

  // Eerst het menu sluiten, daarna pas verder. Op iOS kan een scherm openen terwijl een Modal sluit mislukken.
  const closeThen = (action: () => void) => {
    setOpen(false)
    setTimeout(action, Platform.OS === 'ios' ? 400 : 0)
  }

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.button} hitSlop={8} accessibilityLabel="Account">
        <Settings size={22} color="#ffffff" />
      </Pressable>

      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        <Text style={[styles.title, {color: colors.text}]}>Account</Text>
        <Text style={[styles.email, {color: colors.muted}]}>{user?.email}</Text>

        <Text style={[styles.label, {color: colors.muted}]}>Appearance</Text>
        <View style={styles.segments}>
          {THEME_OPTIONS.map(option => {
            const selected = preference === option.value
            return (
              <Pressable
                key={option.value}
                onPress={() => setPreference(option.value)}
                style={[
                  styles.segment,
                  {
                    borderColor: selected ? '#008000' : colors.border,
                    backgroundColor: selected ? '#008000' : colors.surface,
                  },
                ]}
                accessibilityRole="button"
                accessibilityState={{selected}}>
                <Text style={[styles.segmentText, {color: selected ? '#ffffff' : colors.text}]}>
                  {option.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Pressable
          onPress={() => closeThen(() => void logOut())}
          style={[styles.row, {borderTopColor: colors.border}]}
          accessibilityRole="button">
          <Text style={[styles.rowText, {color: colors.text}]}>Sign out</Text>
        </Pressable>
        <Pressable
          onPress={() => closeThen(() => router.push('/delete-account'))}
          style={[styles.row, {borderTopColor: colors.border}]}
          accessibilityRole="button">
          <Text style={[styles.rowText, styles.danger]}>Delete account</Text>
        </Pressable>
      </BottomSheet>
    </>
  )
}

export default LogoutButton