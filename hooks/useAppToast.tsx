import {useCallback} from 'react'
import {Toast, ToastDescription, ToastTitle, useToast} from '@/components/ui/toast'
import {VStack} from '@/components/ui/vstack'

type ToastAction = 'error' | 'warning' | 'success' | 'info' | 'muted'

// Eén plek voor alle meldingen in de app
export const useAppToast = () => {
  const toast = useToast()

  const show = useCallback(
    (action: ToastAction, title: string, description?: string) => {
      toast.show({
        placement: 'top',
        duration: 3500,
        render: ({id}: {id: string}) => (
          <Toast nativeID={`toast-${id}`} action={action} variant="solid">
            <VStack space="xs">
              <ToastTitle>{title}</ToastTitle>
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </VStack>
          </Toast>
        ),
      })
    },
    [toast],
  )

  return {
    error: (title: string, description?: string) => show('error', title, description),
    warning: (title: string, description?: string) => show('warning', title, description),
    success: (title: string, description?: string) => show('success', title, description),
    info: (title: string, description?: string) => show('info', title, description),
    muted: (title: string, description?: string) => show('muted', title, description),
  }
}