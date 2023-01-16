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
            <h3>Zarejestruj się</h3>

            <div>
                <label>Nazwa:</label>
                <input
                    type={"text"}
                    onChange={handleChange('username')}
                    value={form.username}
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type={"text"}
                    onChange={handleChange('email')}
                    value={form.email}
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
                    value={'Zarejestruj się'}
                    disabled={isLoading} />
            </div>

            <div>
                <button onClick={setPanel('main')}>Wróć</button>
            </div>
            { error && <div className={'error'}>{error}</div> }
        </form>
    )
}

export default SignupPanel;
