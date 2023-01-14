import {useState} from "react";
import { useLogin } from "../../hooks/useLogin";

const LoginPanel = ({ setPanel }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const { login, error, isLoading } = useLogin();

    const handleChange = (field) => (e) => {
        setForm({...form, [field]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(form.email, form.password);

        setPanel('main')();
    }

    return (
        <form className={"signin"} onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input
                type={"text"}
                onChange={handleChange('email')}
                value={form.emailA}
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