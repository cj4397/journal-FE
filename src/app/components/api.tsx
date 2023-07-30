
import { useAuth } from "./auth";


export function useDatabase() {
    const { token } = useAuth()



    const sign_up = async (name: string, email: string, password: string) => {
        const send = await fetch(`${process.env.NEXT_PUBLIC_DB_SIGN_UP}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    name: name,
                    email: email,
                    password: password
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

    const sign_in = async (email: string, password: string) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DB_LOGIN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
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

        sign_up,
        sign_in
    };
}
