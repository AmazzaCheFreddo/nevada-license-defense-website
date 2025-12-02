import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}

