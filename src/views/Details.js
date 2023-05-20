import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Context } from "../Context"
import * as service from "../service"

export function Details() {
    const postId = useParams().postId
    const navigate = useNavigate()

    const { posts, setPosts, post, setPost, user } = useContext(Context)

    const [showConfimrationModal, setShowConfirmationModal] = useState(false)

    async function handleConfirmationModalYes() {
        await service.deletePost(postId)

        setPosts(state => state.filter(p => p._id !== postId))

        navigate(-1)
    }

    useEffect(() => {posts.length > 0 && postId && setPost(posts.find(p => p._id === postId))}, [])

    return (
        <section>
            <div className="postTitle"> {post && post.title} </div>
            <div className="postContent"> {post && post.content} </div>

            {user && post && user._id === post.authorId &&
                <div className="buttonsWrapper">
                    <Link to={`/posts/${postId}/update`} className="button">Update</Link>
                    <button onClick={() => setShowConfirmationModal(true)}>Delete</button>
                </div>
            }

            {user && post && user._id !== post.authorId &&
                <button>Comment</button>
            }

            {showConfimrationModal && <div onClick={() => setShowConfirmationModal(false)} className="confirmationModalWrapper">
                <div className="confirmationModal">
                    <p>Are you sure you want to delete {post?.title}?</p>

                    <div className="buttonsWrapper">
                        <button onClick={handleConfirmationModalYes}>Yes</button>
                        <button onClick={() => setShowConfirmationModal(false)}>No</button>
                    </div>
                </div>
            </div>}
        </section>
    )
}