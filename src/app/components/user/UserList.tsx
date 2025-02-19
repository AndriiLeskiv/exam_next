import Link from "next/link";
import "./UserList.css";
import {FC} from "react";
import {IUser} from "@/app/models/user/IUser";

interface UserCardProps {
    user: IUser;
}

export const UserList: FC<UserCardProps> = ({ user }) => {
    return (
        <div className="user-card">
            <img src={user.image} alt={user.firstName} width="50" />
            <Link href={`/users/${user.id}`}>
                <h3>{user.firstName} {user.lastName}</h3>
            </Link>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Gender: {user.gender}</p>
            <p>Date of birth: {user.birthDate}</p>
        </div>
    );
};