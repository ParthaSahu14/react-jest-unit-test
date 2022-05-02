import ReactDOM from "react-dom";
import { Login } from "../../src/components/Login";
import { BrowserRouter } from "react-router-dom";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { User } from "../../src/model/Model";

const someUser: User = {
    userName: 'someuser',
    email: 'someemail'
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('Login component test suite', () => {

    let container: HTMLDivElement;
    const authServiceMock = {
        login: jest.fn()
    };
    const setUserMock = jest.fn();

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <BrowserRouter>
                <Login
                    authService={authServiceMock as any}
                    setUser={setUserMock} />
            </BrowserRouter>
            ,
            container
        );
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });

    test('Renders correctly initial document', () => {
        const title = document.querySelector('h2');
        expect(title!.textContent).toBe('Login');

        const inputs = document.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login');

        const label = document.querySelector('label');
        expect(label).not.toBeInTheDocument();
    });

    test('Passes credential to auth service', async () => {
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];


        fireEvent.change(loginInput, { target: { value: 'someinput' } });
        fireEvent.change(passwordInput, { target: { value: 'somepwd' } });

        await act(async () => {
            fireEvent.click(loginButton);
        });

        expect(authServiceMock.login).toBeCalledWith('someinput', 'somepwd');
    });

    test('Correctly handle login', async () => {
        authServiceMock.login.mockResolvedValueOnce(someUser);
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, { target: { value: 'someinput' } });
        fireEvent.change(passwordInput, { target: { value: 'somepwd' } });
        fireEvent.click(loginButton);

        const statusLabel = await waitFor(() => container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login Successful');
        expect(setUserMock).toBeCalledWith(someUser);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/profile');
    });

    test('InCorrectly handle login', async () => {
        authServiceMock.login.mockResolvedValueOnce(undefined);
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, { target: { value: 'someinput' } });
        fireEvent.change(passwordInput, { target: { value: 'somepwd' } });
        fireEvent.click(loginButton);

        const statusLabel = await waitFor(() => container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login failed');
    });

});