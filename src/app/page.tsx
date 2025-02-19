"use client";
import Link from "next/link";
import {useAuth} from "@/app/context/AuthContext";

export default function Home() {
  const {isAuthenticated, user} = useAuth();

  return (
      <div className="home-page">
        <h1>Welcome to My Website!</h1>
        {!isAuthenticated ? (
            <div className="auth-message">
              <p>To access more features, you need to <Link href="/login">log in</Link>.</p>
            </div>
        ) : (
            <div className="welcome-message">
              {user?.image && <img src={user.image} alt="User Logo" className="user-logo"/>}
              {user?.firstName &&
                  <p>Welcome back, dear {user.firstName ? user.firstName : " user"}! Enjoy browsing our
                    content.</p>
              }
            </div>
        )}
      </div>
  );
}