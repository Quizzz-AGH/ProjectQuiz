import {useEffect, useState} from "react";
import { useLogin } from "../../hooks/useLogin";
import {useAuth} from "../../hooks/useAuth";

const LoginPanel = ({ setPanel }) => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const { accountId } = useAuth()
    const { login, error, isLoading } = useLogin();

    useEffect(() => {
        if (accountId) {
            setPanel('main')();
        }
    }, [accountId]);

    const handleChange = (field) => (e) => {
        setForm({...form, [field]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(form.username, form.password);
    }

    return (
        <form className={"signup"} onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Username:</label>
            <input
                type={"text"}
                onChange={handleChange('username')}
                value={form.username}
            />

            <label>Password:</label>
            <input
                type={"password"}
                onChange={handleChange('password')}
                value={form.password}
            />

            <button disabled={isLoading}>Login</button>
            { error && <div className={'error'}>{error}</div> }
        </form>
    )
}

export default LoginPanel;