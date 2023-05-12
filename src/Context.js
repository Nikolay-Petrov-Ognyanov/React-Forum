import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as service from "./service"

export const Context = createContext()

export function ContextProvider({ children }) {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.readPosts().then(result => {
            setPosts(result)
        }).catch(error => console.error(error))
    }, [])

    return (
        <Context.Provider
            value={{
                posts
            }}
        >
            {children}
        </Context.Provider>
    )
}