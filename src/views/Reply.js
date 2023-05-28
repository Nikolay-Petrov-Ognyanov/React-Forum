import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../Context"
import * as service from "../service"

export function Reply() {
    const { setPosts, post } = useContext(Context)

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        title: "",
        content: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        content: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setInputs(state => ({
            ...state,
            [name]: value
        }))

        validateInput(event)
    }

    const validateInput = (event) => {
        let { name, value } = event.target

        setErrors(state => {
            const stateObject = { ...state, [name]: "" }

            if (name === "title") {
                if (!value) {
                    stateObject[name] = "Title is required."
                } else if (value && /^[a-zA-Z0-9\s]*$/.test(value) === false) {
                    stateObject[name] = "Please enter a valid title."
                } else if (value && value.length > 38) {
                    stateObject[name] = "Title could be at most 38 characters long."
                }
            } else if (name === "content") {
                if (!value) {
                    stateObject[name] = "Content is required."
                } else if (value && value.length > 250) {
                    stateObject[name] = "Content could be at most 250 characters long."
                }
            }

            return stateObject
        })
    }

    async function handleSave(event) {
        event.preventDefault()

        const { title, content } = Object.fromEntries(new FormData(event.target))

        if (title.trim() && content.trim()) {
            const authorId = localStorage.getItem("_id")

            try {
                const commentData = post && await service.createComment(post._id, {
                    authorId,
                    title,
                    content
                })

                if (commentData) {
                    console.log(commentData)

                    navigate(-1)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    function handleCancel() {
        navigate(-1)
    }

    return (<section>
        <form onSubmit={handleSave} >
            <input
                className="create"
                type="text"
                name="title"
                placeholder="Title"
                value={inputs.title}
                onChange={handleInputChange}
                onBlur={validateInput}
            />

            <textarea
                className="create"
                name="content"
                placeholder="Content"
                value={inputs.content}
                onChange={handleInputChange}
                onBlur={validateInput}
            />

            <div className="buttonsWrapper">
                <button type="submit"
                    disabled={Object.values(errors).some(entry => entry !== "")
                        ? true
                        : Object.values(inputs).some(entry => entry === "")
                    }
                >Save</button>

                <button
                    onClick={handleCancel}
                >Cancel</button>
            </div>
        </form>

        <div className="errorsWrapper">
            <p className="errors">
                {errors.title ? errors.title : errors.content}
            </p>
        </div>
    </section>)
}