"use client"

import { useState } from "react"
import { APIdashboard } from '../../api';
import { useAuth } from "@/app/auth";

export default function Task() {
    const { userData } = useAuth()
    const [task, setTask] = useState('')
    const [details, setDetails] = useState('')
    const { create_task } = APIdashboard()

    const create_task_handler = (e: any) => {
        e.preventDefault();
        create_task(userData, task, details)
    }

    return (

        <main> this is Task

            <form onSubmit={create_task_handler} autoComplete="on">
                <h1>Create Task</h1>

                <input id="new_name" type="text" placeholder="Name" value={task} onChange={(e) => setTask(e.target.value)} required />


                <textarea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} required />

                <button >Create</button>
            </form>

        </main >
    )
}