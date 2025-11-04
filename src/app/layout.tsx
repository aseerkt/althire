import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import { AlertDialogProvider } from '@/components/AlertDialogProvider'
import { Toaster } from '@/components/ui/sonner'

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'althire',
  description:
    'Hiring made simple. althire is an open-source platform that streamlines the hiring process for companies and candidates alike.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${ubuntu.variable} antialiased dark`}>
        {children}
        <AlertDialogProvider />
        <Toaster />
      </body>
    </html>
  )
}
