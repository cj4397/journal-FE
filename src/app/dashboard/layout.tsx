"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "./dashboard.css"

export default function Dashboardlayout(
    props: { children: React.ReactNode }) {

    const route = useRouter();

    return (

        <main id="dashboard">
            <section id="side-navigation">

                <div id="link-container">
                    <h1>Side Navigation</h1>
                    <Link href='/dashboard/task' className="links">Create Task</Link>
                    <Link href='/dashboard' className="links">Task</Link>
                    <Link href='/dashboard/category' className="links">Create category</Link>
                    {/* <Link href={'/'} onClick={() => logout()}>Log Out</Link> */}
                </div>
            </section>


            <section id="dashboard-content">
                {props.children}
            </section>
        </main>

    )
}