'use client'

import { showAlert } from '@/components/AlertDialogProvider'
import { Button } from '@/components/ui/button'
import { applyForJob } from '../actions'

export const ApplyJobButton = ({
  jobId,
  jobTitle,
  companyName,
}: {
  jobId: string
  jobTitle: string
  companyName: string
}) => {
  const onClick = () => {
    showAlert({
      title: `Apply to ${companyName}`,
      description: jobTitle,
      confirmText: 'Apply',
      onConfirm: () => applyForJob(jobId),
    })
  }

  return <Button onClick={onClick}>Apply</Button>
}
