import { useAuth } from "../components/auth";

export function APIdashboard() {
    const { userData } = useAuth()

    const tasks = async () => {
        const send = await fetch(`${process.env.NEXT_PUBLIC_DB_TASKS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    token: userData
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
                    token: userData
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

    const create_task = async (userData: string, task_name: string, task_detail: string) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DB_CREATE_TASK}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "token": userData,
                    "task": {
                        "task": task_name,
                        "details": task_detail
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

    const create_category = async (userData: string, category_name: string, category_detail: string) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DB_CREATE_CATEGORY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "token": userData,
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

    return {
        tasks,
        create_task,
        categories,
        create_category
    };
}
