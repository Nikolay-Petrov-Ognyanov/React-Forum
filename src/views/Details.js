import { useContext, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Context } from "../Context"
import * as service from "../service"

export function Details() {
    const postId = Object.values(useParams())[0]
    const navigate = useNavigate()

    const { posts, setPosts, post, setPost, user } = useContext(Context)

    async function handleDelete() {
        if (window.confirm(`Are you sure you want to delete ${post.title}?`)) {
            await service.deletePost(postId)

            setPosts(state => state.filter(p => p._id !== postId))

            navigate(-1)
        }
    }

    useEffect(() => {
        postId && posts && setPost(postId && posts.find(p => p._id === postId))
    }, [])

    return (
        <section>
            <div className="postTitle"> {post && post.title} </div>
            <div className="postContent"> {post && post.content} </div>

            {user && post && user._id === post.authorId &&
                <div className="buttonsWrapper">
                    <Link to={`posts/${postId}/update`} className="button">Update</Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            }

            {user && post && user._id !== post.authorId &&
                <button>Comment</button>
            }
        </section>
    )
}