"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "./dashboard.css"
import { useAuth } from "../components/auth"

export default function Dashboardlayout(
    props: { children: React.ReactNode }) {
    const { logout } = useAuth()

    return (

        <main id="dashboard">
            <section id="side-navigation">

                <div id="link-container">
                    <h1>Side Navigation</h1>
                    <Link href='/dashboard/task' className="links">Create</Link>
                    <Link href='/dashboard' className="links">Task</Link>
                    <div className="links" onClick={() => logout()}>Log Out</div>
                </div>
            </section>


            <section id="dashboard-content">
                {props.children}
            </section>
        </main>

    )
}