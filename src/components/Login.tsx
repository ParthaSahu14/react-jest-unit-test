import React, { SyntheticEvent, useReducer } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    authService: AuthService;
    setUser: (user: User) => void;
}

interface LoginState {
    userName?: string;
    password?: string;
    loginAttempted?: boolean;
    loginSuccessful?: boolean;
}

interface CustomEvent {
    target: HTMLInputElement
}

const initialState: LoginState = {
    userName: '',
    password: '',
    loginAttempted: false,
    loginSuccessful: false
};

//https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1

const Login: React.FC<LoginProps> = (props: LoginProps) => {
    const [formValues, setFormValues] = useReducer((curvals: LoginState, newvals: LoginState) => ({...curvals, ...newvals}), initialState);
    const navigate = useNavigate();
    const handleFormChange = (e: CustomEvent) => {
        const {name, value} = e.target;
        setFormValues({[name]: value});
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setFormValues({loginAttempted: true});
        if (formValues.userName && formValues.password) {
            const result = await props.authService.login(formValues.userName, formValues.password);
            if (result) {
                setFormValues({ loginSuccessful: true });
                props.setUser(result);
                navigate('/profile');
            }
            else {
                setFormValues({ loginSuccessful: false });
            }
        }
    }

    const loginMessage = () => {
        if (formValues.loginAttempted) {
            if (formValues.loginSuccessful) {
                return <label>Login Successful</label>;
            } else {
                return <label>Login failed</label>;
            }
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input value={formValues.userName} name='userName' onChange={handleFormChange} /><br />
                <input value={formValues.password} name='password' type='password' onChange={handleFormChange} /><br />
                <input type='submit' value='Login' />
            </form>
            {loginMessage()}
        </div>
    );
}

export { Login };