import { useState } from 'react'

export const useDisclosure = (defaultBool = false) => {
  const [open, setOpen] = useState(defaultBool)

  const toggleOpen = () => setOpen((o) => !o)

  return { open, toggleOpen }
}
