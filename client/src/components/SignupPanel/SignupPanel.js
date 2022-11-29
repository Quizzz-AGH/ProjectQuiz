import {useEffect, useState} from "react";
import { useSignup } from "../../hooks/useSignup";
import {useAuth} from "../../hooks/useAuth";

const SignupPanel = ({ setPanel }) => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const { accountId } = useAuth();
    const { signup, error, isLoading } = useSignup();

    useEffect(() => {
        if (accountId)
            setPanel('main')();
    }, [accountId]);

    const handleChange = (field) => (e) => {
        setForm({...form, [field]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(form.username, form.password);
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