import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  redirect('/page/Home')
}