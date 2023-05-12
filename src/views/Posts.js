import { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import * as service from "../service"

export function Posts() {
    const { posts, setPosts } = useContext(Context)

    return (
        <section>
            <h1>Posts</h1>

            {posts.map(p => p.title)}
        </section>
    )
}