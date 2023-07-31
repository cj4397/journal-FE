import { useAuth } from "../components/auth";

export function APIdashboard() {
    const { token } = useAuth()

    const check_user = async () => {
        const send = await fetch(`${process.env.NEXT_PUBLIC_DB_CHECK_USER}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    token: token
                }
            )
        });
        const data = await send.json();
        if (send.ok) {
            return data
        } else {
            return false
        }
    }

    const tasks = async () => {
        const send = await fetch(`${process.env.NEXT_PUBLIC_DB_TASKS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    token: token
                }
            )
        });

        const data = await send.json();
        if (send.ok) {
            return data
        } else {
            return false
        }

    }

    const categories = async () => {
        const send = await fetch('http://127.0.0.1:3000/user/category/all', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    token: token
                }
            )
        });

        const data = await send.json();
        if (send.ok) {
            return data
        } else {
            return false
        }

    }

    const create_task = async (
        task_name: string,
        detail: string,
        category: number,
        due_date: string
    ) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DB_CREATE_TASK}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "token": token,
                    "task": {
                        "task_name": task_name,
                        "details": detail,
                        "category_id": category,
                        "status": "pending",
                        "due_date": due_date
                    }
                }
            )
        });
        const data = await result.json();
        if (result.ok) {
            return data
        } else {
            return false
        }
    }

    const create_category = async (
        category_name: string,
        category_detail: string
    ) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DB_CREATE_CATEGORY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "token": token,
                    "category": {
                        "name": category_name,
                        "details": category_detail
                    }
                }
            )
        });
        const data = await result.json();
        if (result.ok) {
            return data
        } else {
            return false
        }
    }

    const edit_task = async (
        old_name: string,
        task_name: string,
        detail: string,
        category: any,
        status: string,
        due_date: string
    ) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DB_EDIT_TASK}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "token": token,
                    "task_find": old_name,
                    "task": {
                        "task_name": task_name,
                        "details": detail,
                        "category_id": category,
                        "status": status,
                        "due_date": due_date
                    }
                }
            )
        });
        const data = await result.json();
        if (result.ok) {
            return data
        } else {
            return false
        }
    }

    const delete_task = async (
        task_name: string
    ) => {
        const send = await fetch(`${process.env.NEXT_PUBLIC_DB_DELETE_TASK}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    token: token,
                    task_name: task_name
                }
            )
        });

        const data = await send.json();
        if (send.ok) {
            return data
        } else {
            return false
        }

    }

    const delete_category = async (
        id: number
    ) => {
        const send = await fetch(`${process.env.NEXT_PUBLIC_DB_DELETE_CATEGORY}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    token: token,
                    id: id
                }
            )
        });

        const data = await send.json();
        if (send.ok) {
            return data
        } else {
            return false
        }

    }

    return {
        check_user,
        tasks,
        create_task,
        edit_task,
        categories,
        create_category,
        delete_task,
        delete_category
    };
}
