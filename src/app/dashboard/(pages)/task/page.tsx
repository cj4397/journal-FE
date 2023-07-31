"use client"

import { useEffect, useState } from "react"
import { APIdashboard } from '../../api';
import { useRouter } from 'next/navigation';

export default function Task() {
    const route = useRouter();
    const { categories } = APIdashboard()
    const [page, setPage] = useState('')




    const [status, setStatus] = useState(false)

    const [Ccategory, setCcategory] = useState(false)
    const [category_options, setCategoryOptions]: any[] = useState([])

    const Multi_step_form = () => {
        switch (page) {
            case "category":
                return <Create_category setPage={setPage} />;
            case "task":
                return <Create_task setStatus={setStatus} setPage={setPage} Ccategory={Ccategory} category_options={category_options} />;
            default:
                return <Choose setPage={setPage} />;
        }

    }





    async function check_categories() {
        const result = await categories()
        console.log(result)
        if (result.length !== 0) {
            setCcategory(true)
            let list: any[] = []
            result.forEach((element: any) => {
                list.push({ id: element.id, name: element.name })
            });

            setCategoryOptions(list)
        } else {
            setPage("category")
        }

    }

    useEffect(() => {
        check_categories()
    }, [])


    if (status) {
        route.push('/dashboard')
    }



    return (

        <main>


            <Multi_step_form />


        </main >
    )
}


function Create_category(props: any) {
    const route = useRouter();
    const { create_category } = APIdashboard()
    const { setPage } = props



    const next = () => {
        setPage("task")
    }

    const finished = (e: any) => {
        e.preventDefault()
        async function category_creation() {
            const result = await create_category(e.target.category_name.value, e.target.details.value)
            console.log(result)
        }
        category_creation()
        route.push('/dashboard')
    }

    return (
        <>
            <form onSubmit={finished}>
                <h1>Create Category</h1>

                <label htmlFor="category_name">Category Name</label>
                <input id="category_name" name="category_name" type="text" placeholder="Name" />

                <label htmlFor="details">Category Details</label>
                <input placeholder="Details" id="details" name="details" />


                <div className="footer">
                    <button onClick={next}>Create Task</button>
                    <button type="submit" >Finished</button>
                </div>

            </form>
        </>
    )
}

function Create_task(props: any) {
    const { create_task } = APIdashboard()
    const { setPage, setStatus, Ccategory, category_options } = props


    const prev = () => {
        setPage('category')
    }

    const submit = (e: any) => {
        e.preventDefault()

        async function task_creation() {
            const result = await create_task(e.target.task.value, e.target.details.value, e.target.category.value, e.target.due_date.value)
            console.log(result)
        }

        task_creation()
        setStatus(true)
    }

    return (
        <>
            <form onSubmit={submit}>
                <h1>Create Task</h1>

                <label htmlFor="task">Task Name</label>
                <input id="task" name="task" type="text" placeholder="Name" required />

                <label htmlFor="details">Task Details</label>
                <input name="details" id="details" placeholder="Details" required />

                {Ccategory &&
                    <>
                        <label htmlFor="category">Task Category</label>
                        <select name="category" id="category" required>
                            <option value="" disabled selected>Pleace Choose</option>
                            {category_options.map((e: any) => (

                                <option key={e.id} value={e.id}>{e.name}</option>

                            )
                            )}


                        </select>
                    </>
                }


                <label htmlFor="due_date">Task Due Date</label>
                <input
                    id="due_date"
                    name="due_date"
                    min={new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0')}
                    type="date"
                    data-date-format="DD MMMM YYYY"
                />



                <div className="footer">
                    <button onClick={() => prev()}>Create Category</button>
                    <button type="submit" >Submit</button>
                </div>


            </form>
        </>
    )
}

function Choose(props: any) {
    const { setPage } = props
    const create_task = () => {
        setPage("task")
    }
    const create_category = () => {
        setPage("category")
    }
    return (<>
        <div>
            <button onClick={create_task}>Create Task</button>
            <button onClick={create_category}>Create Category</button>
        </div>
    </>)
}