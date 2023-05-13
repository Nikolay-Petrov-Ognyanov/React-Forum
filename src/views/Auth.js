import { useContext, useEffect, useState } from "react"
import * as service from "../service"
import { Context } from "../Context"
import { useNavigate } from "react-router-dom"

export function Auth() {
    const {
        users,
        setUsers,
        user,
        setUser
    } = useContext(Context)

    const [isRegistering, setIsRegistering] = useState(true)
    const [modalMessage, setModalMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    function handleRegister() {
        setIsRegistering(true)
    }

    function handleLogin() {
        setIsRegistering(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target))

        if (!Object.values(formData).some(v => !v)) {
            let result

            try {
                if (isRegistering) {
                    result = await service.register(formData)
                } else {
                    result = await service.login(formData)
                }

                if (result && !result.message) {
                    setUser(result)

                    for (let key in result) {
                        localStorage.setItem(key, result[key])
                    }

                    navigate("/")
                } else {
                    if (Array.isArray(result.message)) {
                        let message = result.message[0]

                        if (result.message.length === 2) {
                            let passwordMessage = result.message[1].toLowerCase()

                            message = `${result.message[0]} and ${passwordMessage}`
                        }

                        result.message = message
                    }

                    setModalMessage(result.message)
                    setShowModal(true)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    function closeModal() {
        setModalMessage("")
        setShowModal(false)
    }

    return (
        <section className="auth">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                />

                <div className="buttonsWrapper">
                    <button
                        type="submit"
                        onClick={handleRegister}
                    >
                        Register
                    </button>

                    <button
                        type="submit"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </form>

            {showModal &&
                <div className="modal">
                    <div className="modalMessage">
                        {modalMessage}
                    </div>

                    <button onClick={closeModal}>OK</button>
                </div>
            }
        </section>
    )
}