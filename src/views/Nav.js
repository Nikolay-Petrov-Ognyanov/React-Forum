import { Link } from "react-router-dom";
import * as service from "../service"
import { useContext, useEffect } from "react";
import { Context } from "../Context";

export function Nav() {
    const { users, user, setUser } = useContext(Context)

    function handleLogout() {

    }

    return (
        <nav>
            <Link to="/posts" className="button">Posts</Link>

            {!user && <Link to="/auth" className="button">Sign in</Link>}

            {user && <button onClick={handleLogout} className="button">Sign out</button>}
        </nav>
    )
}