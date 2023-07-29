"use client"

import { useState } from "react"
import { APIdashboard } from '../../api';
import { useAuth } from "@/app/components/auth";


export default function Category() {
    const { userData } = useAuth()
    const [category, setCategory] = useState('')
    const [details, setDetails] = useState('')
    const { create_category } = APIdashboard()

    const create_category_handler = (e: any) => {
        e.preventDefault();
        create_category(userData, category, details)
    }

    return (
        <main>this is Category


            <form onSubmit={create_category_handler} autoComplete="on">
                <h1>Create Category</h1>

                <input id="new_name" type="text" placeholder="Name" value={category} onChange={(e) => setCategory(e.target.value)} required />


                <textarea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} required />

                <button >Create</button>
            </form>
        </main>
    )
}