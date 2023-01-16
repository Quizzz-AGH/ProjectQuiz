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
            <h3>Zaloguj się</h3>

            <div>
                <label>Email:</label>
                <input
                    type={"text"}
                    onChange={handleChange('email')}
                    value={form.emailA}
                />
            </div>

            <div>
                <label>Hasło:</label>
                <input
                    type={"password"}
                    onChange={handleChange('password')}
                    value={form.password}
                />
            </div>

            <div>
                <input
                    type={'submit'}
                    value={'Zaloguj się'}
                    disabled={isLoading} />
            </div>
            <div>
                <button onClick={setPanel('main')}>Wróć</button>
            </div>

            { error && <div className={'error'}>{error}</div> }
        </form>
    )
}

export default LoginPanel;
