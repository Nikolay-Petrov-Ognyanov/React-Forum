import { useNavigate } from "react-router-dom"
import * as service from "../service"

export function Create() {
    const navigate = useNavigate()

    async function handleSave(event) {
        event.preventDefault()

        const { title, content } = Object.fromEntries(new FormData(event.target))

        if (title.trim() && content.trim()) {
            const authorId = localStorage.getItem("_id")

            try {
                const postData = await service.createPost({
                    authorId,
                    title,
                    content
                })

                if (postData) {
                    navigate("/posts")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    function handleCancel() {
        navigate(-1)
    }

    return (
        <section>
            <form onSubmit={handleSave} >
                <input className="create" type="text" name="title" placeholder="Title" />

                <textarea className="create" name="content" placeholder="Content"></textarea>

                <div className="buttonsWrapper">
                    <button type="submit">Save</button>

                    <button onClick={handleCancel} >Cancel</button>
                </div>
            </form>
        </section>
    )
}