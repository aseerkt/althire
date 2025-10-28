'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// --- internal trigger reference
let triggerAlert: ((options: AlertOptions) => void) | null = null

type AlertOptions = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
}

export function AlertDialogProvider() {
  const [options, setOptions] = useState<AlertOptions | null>(null)
  const [loading, setLoading] = useState(false)

  triggerAlert = setOptions // register trigger

  const handleConfirm = async () => {
    if (!options?.onConfirm) return setOptions(null)
    try {
      setLoading(true)
      await options.onConfirm()
    } finally {
      setLoading(false)
      setOptions(null)
    }
  }

  return (
    <AlertDialog open={!!options} onOpenChange={(o) => !o && setOptions(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options?.title}</AlertDialogTitle>
          {options?.description && (
            <AlertDialogDescription>
              {options.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {options?.cancelText ?? 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={loading}>
            {loading ? 'Processing...' : (options?.confirmText ?? 'Confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// 🔥 exported function you can call anywhere
export function showAlert(options: AlertOptions) {
  triggerAlert?.(options)
}
