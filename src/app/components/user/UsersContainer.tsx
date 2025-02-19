"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {getAllUsers} from "@/app/service/api.service";
import {SearchBar} from "@/app/components/search/SearchBar";
import {UserList} from "@/app/components/user/UserList";
import {Pagination} from "@/app/components/pagination/Pagination";
import {IUser} from "@/app/models/user/IUser";

const UsersContainer = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [users, setUsers] = useState<IUser[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const page = Number(searchParams.get("page")) || 1;
    const searchQuery = searchParams.get("q") || "";


    useEffect(() => {
        fetchUsers(page, searchQuery).catch((error) =>
            console.error("Помилка отримання юзерів:", error)
        );
    }, [page, searchQuery]);

    const fetchUsers = async (page: number, query: string) => {
        setLoading(true);
        try {
            const { users, total } = await getAllUsers(page, query);
            setUsers(users);
            setTotal(total);
        } catch (error) {
            console.error("Помилка отримання юзерів:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateParams = (params: Record<string, string>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, value);
            else newParams.delete(key);
        });

        router.push(`/users?${newParams.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        updateParams({ page: newPage.toString() });
    };

    const handleSearch = (query: string) => {
        updateParams({ page: "1", q: query });
    };

    return (
        <div>
            <h1>User list</h1>
             <SearchBar searchType="users" onSearch={handleSearch} search={searchQuery} />
            <ul>
                {loading ? (
                    <p>Loading...</p>
                ) : users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>
                            <UserList user={user} />
                        </li>
                    ))
                ) : (
                    <p>No users</p>
                )}
            </ul>
            {total > 0 && (
                <Pagination totalPages={Math.ceil(total / 30)} currentPage={page} onPageChange={handlePageChange} />
            )}
        </div>
    );
}

export default UsersContainer;