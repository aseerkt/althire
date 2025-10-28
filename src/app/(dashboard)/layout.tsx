import { Navbar } from '@/components/navbar/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <div className='p-4 max-w-4xl mx-auto flex-1'>{children}</div>
    </div>
  )
}
