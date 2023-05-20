import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Link, useFetcher } from "react-router-dom"
import { Context } from "../Context"
import * as service from "../service"

export function Details() {
    const { posts, post, setPost, setPosts, user } = useContext(Context)

    const postId = useParams().postId

    const [showConfimrationModal, setShowConfirmationModal] = useState(false)

    const navigate = useNavigate()

    async function handleConfirmationModalYes() {
        await service.deletePost(postId)

        setPosts(state => state.filter(p => p._id !== postId))

        navigate(-1)
    }

    useEffect(() => {
        service.readPost(postId).then(result => setPost(result)).catch(error => console.error(error))
    }, [])

    return (
        <section>
            <div className="postWrapper">

                <div className="postTitle"> {post && post.title} </div>
                <div className="postContent"> {post && post.content} </div>
            </div>

            {
                user && post && user._id === post.authorId &&
                <div className="buttonsWrapper">
                    <Link to={`/posts/${postId}/update`} className="button">Update</Link>
                    <button onClick={() => setShowConfirmationModal(true)}>Delete</button>
                </div>
            }


            {
                user && post && user._id !== post.authorId &&
                <button>Comment</button>
            }

            {
                showConfimrationModal && <div onClick={() => setShowConfirmationModal(false)} className="confirmationModalWrapper">
                    <div className="confirmationModal">
                        <p>Are you sure you want to delete {post?.title}?</p>

                        <div className="buttonsWrapper">
                            <button onClick={handleConfirmationModalYes}>Yes</button>
                            <button onClick={() => setShowConfirmationModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            }
        </section >
    )
}