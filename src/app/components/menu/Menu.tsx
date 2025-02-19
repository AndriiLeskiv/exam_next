"use client";
import "./Menu.css"
import Link from "next/link";
import {useAuth} from "@/app/context/AuthContext";

export const Menu = () => {
    const {isAuthenticated, user, handleLogout} = useAuth();

    return (
        <nav>
            <div className="logo">
                <Link href="/">MyApp</Link>
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link href="/users">Users</Link></li>
                        <li><Link href="/recipes">Recipes</Link></li>
                        <li className="user-profile">
                            {user?.image && <img src={user.image} alt="User Logo" className="user-logo"/>}
                            <span>{user?.firstName || "User"}</span>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li><Link href="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};