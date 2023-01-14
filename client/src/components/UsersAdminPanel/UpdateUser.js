import React, {useState} from "react";

const UpdateUser = ({ updateUserPopup, close }) => {
    const [name, setName] = useState(updateUserPopup.name);
    const [email, setEmail] = useState(updateUserPopup.email);

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: name,
            email: email
        };

        await fetch(`/users/${updateUserPopup._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .catch(error => {
                window.alert(error);
            })

        close();
    };

    return (
        <div>
            <h3>Zmień użytkownika</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor={'content'}>Nazwa</label>
                    <input
                        type={'text'}
                        id={'name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor={'content'}>Email</label>
                    <input
                        type={'text'}
                        id={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type={'submit'}
                        value={'Zmień'}
                    />
                    <button onClick={close}>Anuluj</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
