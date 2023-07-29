"use client"


// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', minWidth: 30 },
//     { field: 'task', headerName: 'Task', minWidth: 100 },
//     { field: 'category', headerName: 'Category', minWidth: 100 },
//     { field: 'status', headerName: 'Status', minWidth: 70 },
//     {
//         field: 'due',
//         headerName: 'Due Date',
//         type: 'number',
//         width: 100,
//     },
//     {
//         field: 'date',
//         headerName: 'Date',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 150
//     },
// ];

// const rows = [
//     { id: 1, task: 'Snow', category: 'Jon', status: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

import { APIdashboard } from './api';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    id: number,
    task: string,
    category: string,
    status: string,
    due_date: string,
    updated_at: string,
) {
    return { id, task, category, status, due_date, updated_at };
}

function createModalData(
    task: string,
    details: string,
    category: string,
    status: string,
    due_date: string,
    updated_at: string,
) {
    return { task, details, category, status, due_date, updated_at };
}

function createcategories(
    id: number,
    name: string,
    details: string,
    updated_at: string,
) {
    return { id, name, details, updated_at };
}

import { useEffect, useState } from 'react';



export default function Dashboard() {
    const { tasks, categories } = APIdashboard()
    const [rows, setRows]: any[] = useState([])
    const [data, setData]: any[] = useState([])
    const [modal_data, setModalData]: any = useState({})
    const [modal_open, setModalOpen] = useState(false)


    // const rows = [
    //     // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];

    async function show_task() {
        const result = await tasks()
        if (result) {
            const list: any[] = []
            const datas: any[] = []
            let i = 1
            result.forEach((e: any) => {
                list.push(createData(i, e.task, e.category, e.status, e.due_date, e.updated_at))
                datas.push(createModalData(e.task, e.details, e.category, e.status, e.due_date, e.updated_at))
                i++

            });
            setData(datas)
            setRows(list)
        } else {
            console.log("invalid email or password")
        }
    }


    useEffect(() => {
        show_task()

    }, [])


    const alert = (a: any) => {
        setModalOpen(true)
        data.forEach((element: any) => {
            if (element.task == a) {
                setModalData(element)
            }
        });

    }

    const choose_category = () => {

    }

    return (
        <main>

            <section id='task-title'>
                <h1>Task list</h1>
            </section>
            <section id='task-content'>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell align="right">Task</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Due-date</TableCell>
                                <TableCell align="right">Updated Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell onClick={() => alert(row.task)} align="right">{row.task}</TableCell>
                                    <TableCell onClick={() => choose_category()} align="right">{row.category}
                                    </TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.due_date}</TableCell>
                                    <TableCell align="right">{row.updated_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </section>
            {modal_open &&
                <Modal datas={modal_data} closer={setModalOpen}></Modal>
            }
        </main>
    )
}


function Modal(props: any) {
    const { categories } = APIdashboard()
    const { closer, datas } = props
    const { task, details, category, status, due_date, updated_at } = datas
    const [category_list, setCategories]: any[] = useState([])
    const [new_task, setTask] = useState(task)
    const [new_details, setDetails] = useState(details)
    const [new_category, setNewCategory] = useState(category)
    const [new_status, setStatus] = useState(status)
    const [new_due_date, setDueDate] = useState(due_date)
    const [new_updated_at, setUpdatedAt] = useState(updated_at)


    async function show_categories() {
        const result = await categories()
        if (result) {
            const list: any[] = []
            let i = 1
            result.forEach((e: any) => {
                list.push(createcategories(i, e.name, e.details, e.updated_at))
                i++
            });
            setCategories(list)
        } else {
            console.log("invalid email or password")
        }
    }

    useEffect(() => {
        show_categories()
    }, [])


    const close = () => {
        closer(false)
    }

    const create_edit = (e: any) => {
        e.preventDefault();
        console.log(new_category)
    }

    return (
        <>

            <div id="myModal" className="modal">


                <div className="modal-content">
                    <span onClick={() => { close() }} className="close">&times;</span>

                    <div>
                        <form onSubmit={create_edit} autoComplete="on">
                            <label htmlFor="name">Name</label>
                            <input id='name' type="text" value={new_task} onChange={(e: any) => setTask(e.target.value)} required />

                            <label htmlFor="details">Details</label>
                            <input id='details' type="text" value={new_details} onChange={(e: any) => setDetails(e.target.value)} required />

                            <label htmlFor="category">Category</label>
                            <select id='category' onChange={(e: any) => setNewCategory(e.target.value)}>
                                <option value={category}>{category}</option>
                                {category_list.map((e: any) => (
                                    <option key={e.id} value={e.name} >{e.name}</option>
                                ))}
                            </select>

                            <label htmlFor="status">Status</label>
                            <select name="status" id="status" onChange={(e: any) => setStatus(e.target.value)}>
                                <option value={new_status}>{new_status}</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </select>

                            <input
                                min={new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0')}
                                onChange={e => setDueDate(e.target.value)}
                                value={new_due_date}
                                type="date" />

                            <button type="submit">edited</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}