"use client"


import { APIdashboard } from './api';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const route = useRouter();
    const { categories, check_user, delete_category } = APIdashboard()
    const [rows, setRows]: any[] = useState([])

    const [modal_data, setModalData]: any = useState({})
    const [modal_open, setModalOpen] = useState(false)
    const { logout, token } = useAuth()
    const [category_list, setCategoryList]: any[] = useState([])



    async function check_for_user() {
        if (token === null) {
            logout()
        }
        try {
            await check_user()
        } catch (error) {
            console.error(error);
            logout()
        }

    }

    async function show_categories() {
        const result = await categories()
        if (result) {
            let list: any[] = []
            result.forEach((element: any) => {
                list.push({ id: element.id, name: element.name })
            })
            setRows(result)
            console.log(list)
            setCategoryList(list)

            console.log(category_list)
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        show_categories()
        check_for_user()
    }, [])

    const edit_task = (data: any) => {
        setModalData(data)
        setModalOpen(true)

    }

    const category_delete = (id: number) => {
        async function delete_this() {
            const result = await delete_category(id)
            if (result) {
                route.push('/dashboard')
            } else {
                console.log('error')
            }
        }
        delete_this()

    }

    return (
        <main>

            <section id='task-title'>
                <h1>Task list</h1>
            </section>
            <section id='task-content'>

                {rows.map((row: any) => (
                    <div key={row.id}>
                        <div>
                            <button >{row.name}</button>
                            <button onClick={() => category_delete(row.id)}>Delete {row.name}</button>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Task</TableCell>
                                        <TableCell align="center">Details</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Due-date</TableCell>
                                        <TableCell align="center">Updated Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.task.map((e: any) => (
                                        <TableRow
                                            onClick={() => edit_task(e)}
                                            key={e.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {e.task_name}
                                            </TableCell>
                                            <TableCell align="right">{e.details}
                                            </TableCell>
                                            <TableCell align="right">{e.status}</TableCell>
                                            <TableCell align="right">{e.due_date}</TableCell>
                                            <TableCell align="right">{e.updated_at}</TableCell>
                                        </TableRow>

                                    ))}


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))}


            </section>
            {modal_open &&
                <Modal category_list={category_list} datas={modal_data} closer={setModalOpen} ></Modal>
            }
        </main>
    )
}




function Modal(props: any) {

    const { edit_task, delete_task } = APIdashboard()
    const { closer, datas, category_list } = props
    const { task_name, details, status, due_date } = datas
    const [task, setTask] = useState(task_name)
    const [task_details, setTaskDetails] = useState(details)
    const [task_category, setTaskCategory] = useState('')
    const [task_status, setTaskStatus] = useState(status)
    const [task_due_date, setTaskDueDate] = useState(due_date)

    const close = () => {
        closer(false)
    }

    const create_edit = (e: any) => {
        e.preventDefault();
        async function check_for_user() {
            await edit_task(task_name, task, task_details, task_category, task_status, task_due_date)
        }

        check_for_user()
        closer(false)

    }

    const deleter = () => {
        async function deleted() {
            await delete_task(task_name)
        }
        deleted()
        closer(false)
    }

    return (
        <>

            <div id="myModal" className="modal">


                <div className="modal-content">
                    <span onClick={() => { close() }} className="close">&times;</span>

                    <div>
                        <form onSubmit={create_edit}>
                            <h1>Create Task</h1>

                            <label htmlFor="task">Task Name</label>
                            <input id="task" name="task" type="text" placeholder="Name" value={task} onChange={(e: any) => setTask(e.target.value)} required />

                            <label htmlFor="details">Task Details</label>
                            <input name="details" id="details" placeholder="Details" value={task_details} onChange={(e: any) => setTaskDetails(e.target.value)} required />


                            <label htmlFor="category">Task Category</label>
                            <select name="category" id="category" onChange={(e: any) => setTaskCategory(e.target.value)} required>
                                <option value="" disabled selected>Pleace Choose</option>
                                {category_list.map((e: any) => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )
                                )}
                            </select>

                            <label htmlFor="status">Task Status</label>
                            <select name="status" id="status" value={task_status} onChange={(e: any) => setTaskStatus(e.target.value)} required>
                                <option value="pending">Pending</option>
                                <option value="complete">Complete</option>
                            </select>


                            <label htmlFor="due_date">Task Due Date</label>
                            <input
                                id="due_date"
                                name="due_date"

                                onChange={(e: any) => setTaskDueDate(e.target.value)}
                                min={new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0')}
                                type="date"
                                data-date-format="DD MMMM YYYY"
                                required
                            />



                            <div className="footer">
                                <button type="submit" >Submit</button>
                            </div>


                        </form>
                        <button onClick={deleter}>Delete Task</button>
                    </div>
                </div>

            </div>
        </>
    )
}