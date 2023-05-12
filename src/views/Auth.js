import { useContext, useEffect } from "react"
import * as service from "../service"
import { Context } from "../Context"

export function Auth() {
    const { users, setUsers, user, setUser } = useContext(Context)

    async function handleAuthentication(event) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target))

        
    }

    return (
        <section>
            <form onSubmit={handleAuthentication}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />

                <div className="buttonsWrapper">
                    <button>Sign in</button>
                </div>
            </form>
        </section>
    )
}