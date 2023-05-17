import { NavLink } from "react-router-dom";
import * as service from "../service"
import { useContext, useEffect } from "react";
import { Context } from "../Context";

export function Nav() {
    const { users, user, setUser } = useContext(Context)

    useEffect(() => {
        console.log(user && user)
    }, [])

    function handleLogout() {
        service.logout({ accessToken: user.accessToken })

        localStorage.clear()
        setUser(null)
    }

    return (
        <nav style={{
            justifyContent: user ? "space-evenly" : "center",
            gap: user ? 0 : "2vw"
        }}>
            <NavLink to="/posts" className="button" activeclassname="active">Posts</NavLink>

            {user && <NavLink to="/create" className="button" activeclassname="active">Create</NavLink>}

            {user && <NavLink to={`/profile/${user._id}`} className="button" activeclassname="active">Profile</NavLink>}

            {!user && <NavLink to="/auth" className="button" activeclassname="active">Sign in</NavLink>}

            {user && <button onClick={handleLogout} className="button">Sign out</button>}
        </nav>
    )
}