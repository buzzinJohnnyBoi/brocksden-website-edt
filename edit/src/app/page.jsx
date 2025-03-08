import connection from "@/lib/db";
import Edit from "./page/_src/editPage";
import Nav from "@/components/nav/nav";
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  redirect('/page/Home')
}