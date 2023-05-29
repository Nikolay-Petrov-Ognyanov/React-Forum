import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Link, useFetcher } from "react-router-dom"
import { Context } from "../Context"
import * as service from "../service"

export function Details() {
    const { posts, post, setPost, setPosts, user, users } = useContext(Context)

    const postId = useParams().postId

    const postAuthor = users.length > 0 && post && users.find(
        u => u._id === post.authorId
    )

    const [showConfimrationModal, setShowConfirmationModal] = useState(false)

    const navigate = useNavigate()

    async function handleConfirmationModalYes() {
        await service.deletePost(postId)

        setPosts(state => state.filter(p => p._id !== postId))
        navigate(-1)
    }

    useEffect(() => {
        service.readPost(postId).then(result =>
            result && setPost(result)
        ).catch(error => console.error(error))
    }, [posts])

    return (<section>
        <div className="postWrapper">
            <p className="postTitle"> {post && post.title} </p>

            {postAuthor && <p className="authorName">
                by <Link to={`/profile/${postAuthor._id}`}>
                    {postAuthor.username}
                </Link>
            </p>}

            <p className="postContent"> {post && post.content} </p>

            {user && post && <div className="buttonsWrapper">
                {post.authorId === user._id &&
                    <Link to={`/posts/${postId}/update`} className="button"
                    >Update</Link>
                }

                <Link to={`/posts/${postId}/reply`} className="button">Reply</Link>

                {post.authorId === user._id &&
                    <button onClick={() => setShowConfirmationModal(true)}
                    >Delete</button>
                }
            </div>}
        </div>

        {post && post.comments.length > 0 && post.comments.map(
            comment => <div key={comment.commentId} className="postWrapper">
                <p className="postTitle">{comment.title}</p>

                {comment.authorId && users.length > 0 && <p className="authorName">
                    by <Link to={`/profile/${postAuthor._id}`}>
                        {users.find(u => u._id === comment.authorId).username}
                    </Link>
                </p>}

                <p className="postContent"> {comment.content} </p>
            </div>
        )}

        {showConfimrationModal && <div onClick={() => setShowConfirmationModal(false)} className="confirmationModalWrapper">
            <div className="confirmationModal">
                <p>Are you sure you want to delete {post?.title}?</p>

                <div className="buttonsWrapper">
                    <button onClick={handleConfirmationModalYes}>Yes</button>
                    <button onClick={() => setShowConfirmationModal(false)}
                    >No</button>
                </div>
            </div>
        </div>}
    </section >)
}