import { useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Context } from "../Context"

export function Details() {
    const postId = Object.values(useParams())[0]
    const navigate = useNavigate()

    const { posts, post, setPost, user } = useContext(Context)

    useEffect(() => {
        postId && posts && setPost(postId && posts.find(p => p._id === postId))
    }, [])

    return (
        <section>
            <div className="postTitle"> {post && post.title} </div>
            <div className="postContent"> {post && post.content} </div>

            {user && post && user._id === post.authorId &&
                <div className="buttonsWrapper">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            }

            {user && post && user._id !== post.authorId &&
                <button>Comment</button>
            }
        </section>
    )
}