import React from "react";

function UserLog(props) {

    return (
        <tr>
            <td>{props.user._id}</td>
            <td>{props.user.name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.password}</td>
            <td>{props.user.rankingScore}</td>
            <td>{props.user.role}</td>
        </tr>
    )
}

export default UserLog;