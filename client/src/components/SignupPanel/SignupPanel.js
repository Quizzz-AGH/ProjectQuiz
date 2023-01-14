import {useState} from "react";
import { useSignup } from "../../hooks/useSignup";

const SignupPanel = ({ setPanel }) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const { signup, error, isLoading } = useSignup();

    const handleChange = (field) => (e) => {
        setForm({...form, [field]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(form.username, form.email, form.password);

        setPanel('main')();
    }

    return (
        <form className={"signup"} onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Username:</label>
            <input
                type={"text"}
                onChange={handleChange('username')}
                value={form.username}
            />

            <label>Email:</label>
            <input
                type={"text"}
                onChange={handleChange('email')}
                value={form.email}
            />

            <label>Password:</label>
            <input
                type={"password"}
                onChange={handleChange('password')}
                value={form.password}
            />

            <button disabled={isLoading}>Sign up</button>
            { error && <div className={'error'}>{error}</div> }
        </form>
    )
}

export default SignupPanel;