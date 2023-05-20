import { useContext, useEffect} from "react"
import { Context } from "../Context"
import { Card } from "./Card"
import * as service from "../service"

export function Posts() {
    const { posts, setPosts } = useContext(Context)

    useEffect(() => {
        service.readPosts().then(result => {
            setPosts(result || [])
        }).catch(error => console.error(error))
    }, [])

    return (
        <section>
            <div className="postsWrapper">
                {posts.length > 0 && posts.map(p => p._id && <Card key={p._id} post={p} />)}
            </div>
        </section>
    )
}