import React, {useEffect, useState} from "react";

import UserLog from "../UserLog/UserLog";

function UsersAdminPanel() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch('/users', {
                method: "GET"
            });

            if (!response.ok) {
                window.alert(`An error occurred: ${response.statusText}`);
                return;
            }

            const users = await response.json();
            setUsers(users.users);
        }

        getUsers();
    }, [users.length]);

    function userList() {
        return users.map((record) => {
            return (
                <UserLog user={record} />
            );
        });
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Rank</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>{userList()}</tbody>
            </table>
        </div>
    )
}

export default UsersAdminPanel;