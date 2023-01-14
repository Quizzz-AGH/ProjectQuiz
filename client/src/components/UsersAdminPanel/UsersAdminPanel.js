import React, {useEffect, useState} from "react";

import UserLog from "../UserLog/UserLog";
import Popup from "../Popup/Popup";
import UpdateUser from "./UpdateUser";

function UsersAdminPanel() {

    const [users, setUsers] = useState([]);
    const [updateUserPopup, setUpdateUserPopup] = useState(null);
    const [deleteUserPopup, setDeleteUserPopup] = useState(null);

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
    }, [users.length, updateUserPopup, deleteUserPopup]);

    const handleDelete = async (user) => {
        await fetch(`/users/${user._id}`, {
            method: "DELETE"
        })
            .catch(error => {
                window.alert(error);
            })
        setDeleteUserPopup(null);
    }

    function userList() {
        return users.map((record) => {
            return (
                <UserLog user={record} setUpdate={setUpdateUserPopup} setDelete={setDeleteUserPopup} />
            );
        });
    }

    return (
        <div>
            {updateUserPopup &&
                <Popup>
                    <UpdateUser updateUserPopup={updateUserPopup} close={() => setUpdateUserPopup(null)} />
                </Popup>
            }
            {deleteUserPopup &&
                <Popup>
                    <div>Czy usunąć użytkownika {deleteUserPopup._id}? Nie można tego cofnąć.</div>
                    <div>
                        <button onClick={() => handleDelete(deleteUserPopup)}>Tak</button>
                        <button onClick={() => setDeleteUserPopup(null)}>Nie</button>
                    </div>
                </Popup>
            }
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