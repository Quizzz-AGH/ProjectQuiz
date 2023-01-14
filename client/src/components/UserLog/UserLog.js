import React from "react";

function UserLog({ user, setUpdate, setDelete}) {

    return (
        <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.rankingScore}</td>
            <td>{user.role}</td>
            <td><button onClick={() => setUpdate(user)}>Zmień</button></td>
            <td>
                {user.role !== 'admin' && <button onClick={() => setDelete(user)}>x</button>}
            </td>
        </tr>
    )
}

export default UserLog;