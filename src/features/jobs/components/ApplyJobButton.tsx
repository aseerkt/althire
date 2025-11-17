'use client'

import { showAlert } from '@/components/AlertDialogProvider'
import { Button } from '@/components/ui/button'
import { applyForJob } from '../actions'

export const ApplyJobButton = ({
  jobId,
  jobTitle,
  organizationName,
}: {
  jobId: string
  jobTitle: string
  organizationName: string
}) => {
  const onClick = () => {
    showAlert({
      title: `Apply to ${organizationName}`,
      description: jobTitle,
      confirmText: 'Apply',
      onConfirm: () => applyForJob(jobId),
    })
  }

  return <Button onClick={onClick}>Apply</Button>
}
