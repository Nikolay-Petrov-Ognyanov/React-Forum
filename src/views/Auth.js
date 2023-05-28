import { useContext, useEffect, useState } from "react"
import * as service from "../service"
import { Context } from "../Context"
import { useNavigate } from "react-router-dom"

export function Auth() {
    const { setUser } = useContext(Context)
    
    const [isRegistering, setIsRegistering] = useState(true)
    const [modalMessage, setModalMessage] = useState("")
    const [showModal, setShowModal] = useState(false)
    
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })


    function handleInputChange(event) {
        const { name, value } = event.target

        setInputs(state => ({ ...state, [name]: value }))
        validateInput(event)
    }

    function validateInput(event) {
        const { name, value } = event.target

        setErrors(state => {
            const stateObject = { ...state, [name]: "" }

            if (name === "username") {
                if (!value) {
                    stateObject[name] = "Username is required."
                } else if (value.length < 2) {
                    stateObject[name] = "Username must be at least 2 characers long."
                }
            } else if (name === "password") {
                if (!value) {
                    stateObject[name] = "Password is required."
                } else if (value.length < 5) {
                    stateObject[name] = "Password must be at least 5 characters long."
                }
            }

            return stateObject
        })
    }

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
                } else if (result && result.message) {
                    let message = result.message

                    if (Array.isArray(result.message)) {
                        let usernameMessage = result.message[0]
                        let passwordMessage = result.message[1].toLowerCase()

                        message = `${usernameMessage} and ${passwordMessage}`
                    }

                    setModalMessage(message)
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

    return (<section className="auth">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={inputs.username}
                    onChange={handleInputChange}
                    onBlur={validateInput}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    onBlur={validateInput}
                />

                {
                    !Object.values(errors).some(entry => entry !== "") &&
                    !Object.values(inputs).some(entry => entry === "") &&

                    <div className="buttonsWrapper">
                        <button
                            type="submit"
                            onClick={handleRegister}
                            className="button top left"
                        >Register</button>

                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="button top right"
                        >Login</button>
                    </div>
                }
            </form>

            <div className="errorsWrapper">
                {errors.username && <p className="errors">{errors.username}</p>}
                {errors.password && <p className="errors">{errors.password}</p>}
            </div>

            {
                showModal &&

                <div className="modal">
                    <div className="modalMessage">{modalMessage}</div>

                    <button onClick={closeModal}>OK</button>
                </div>
            }
        </section >)
}