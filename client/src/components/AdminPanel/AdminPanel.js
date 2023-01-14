import React, {useState} from "react";

import AdminNavbar from "../AdminNavbar/AdminNavbar";
import QuestionsAdminPanel from "../QuestionsAdminPanel/QuestionsAdminPanel";
import UsersAdminPanel from "../UsersAdminPanel/UsersAdminPanel";

function AdminPanel() {

    const [panel, setPanel] = useState('questions');

    const renderPanel = () => {
        switch(panel) {
            case 'questions':
                return <QuestionsAdminPanel />;
            case 'users':
                return <UsersAdminPanel />;
            default:
                return null
        }
    }

    return (
        <div>
            <AdminNavbar panel={panel}
                         setPanel={setPanel} />
            {renderPanel()}
        </div>
    )
}

export default AdminPanel;