import { createContext, useEffect, useState } from "react";
import * as service from "./service"

export const Context = createContext()

export function ContextProvider({ children }) {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState(null)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        service.readPosts().then(result => {
            setPosts(result)
        }).catch(error => console.error(error))

        service.readUsers().then(result => {
            setUsers(Object.values(result).flat())
        }).catch(error => console.error(error))

        if (localStorage.getItem("username")) {
            setUser({
                _id: localStorage.getItem("_id"),
                username: localStorage.getItem("username"),
                accessToken: localStorage.getItem("accessToken")
            })
        }
    }, [])

    return (
        <Context.Provider
            value={{
                posts,
                setPosts,
                post,
                setPost,
                users,
                setUsers,
                user,
                setUser
            }}
        >
            {children}
        </Context.Provider>
    )
}