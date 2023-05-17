import { Link } from "react-router-dom";
import * as service from "../service"
import { useContext, useEffect } from "react";
import { Context } from "../Context";

export function Nav() {
    const { users, user, setUser } = useContext(Context)

    function handleLogout() {
        service.logout({ accessToken: user.accessToken })

        localStorage.clear()
        setUser(null)
    }

    return (
        <nav>
            <Link to="/posts" className="button top left">Posts</Link>

            {!user && <Link to="/auth" className="button top right">Sign in</Link>}

            {user && <button onClick={handleLogout} className="button top right">Sign out</button>}

            <Link to="/posts" className="button bot">Posts</Link>

            {!user && <Link to="/auth" className="button bot">Sign in</Link>}

            {user && <button onClick={handleLogout} className="button bot">Sign out</button>}
        </nav>
    )
}