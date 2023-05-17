import { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import * as service from "../service"
import { Card } from "./Card"

export function Posts() {
    const { posts, setPosts } = useContext(Context)

    useEffect(() => {
        service.readPosts().then(result => {
            setPosts(result && result)
        }).catch(error => console.error(error))
    }, [])

    return (
        <section>
            <div className="postsWrapper">
                {posts.length > 0 && posts.map(p => <Card key={p._id} post={p} />)}
            </div>
        </section>
    )
}