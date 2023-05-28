import { useNavigate } from "react-router-dom"

export function Card({ post }) {
    const navigate = useNavigate()

    function viewPost() {
        navigate(`/posts/${post._id}`)
    }

    return (<div onClick={viewPost} className="postCard">
        {post.title}
    </div>)
}