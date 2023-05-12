import { useContext, useEffect } from "react"
import * as service from "../service"
import { Context } from "../Context"

export function Auth() {
    const { users, setUsers, user, setUser } = useContext(Context)

    async function handleRegister(event) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target))

        service.register(formData).then(
            result => {
                setUser(result)
                setUsers([...users, result])
                
                for (let key in result) {
                    localStorage.setItem(key, result[key])
                }
            }
        ).catch(error => console.error(error))
    }

    async function handleLogin(event) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target))

        service.login(formData).then(
            result => {
                setUser(result)

                for (let key in result) {
                    localStorage.setItem(key, result[key])
                }
            }
        ).catch(error => console.error(error))
    }


    return (
        <section className="auth">
            <form onSubmit={handleRegister}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />

                <button>Register</button>
            </form>

            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />

                <button>Login</button>
            </form>
        </section>
    )
}