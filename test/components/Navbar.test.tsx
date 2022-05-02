import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "../../src/components/Navbar";
import { User } from "../../src/model/Model";

describe('Navbar component test suite', () => {
    let container: HTMLDivElement;
    const someUser: User = {
        userName: 'someuser',
        email: 'someemail'
    };
    const BASELINK = 'http://localhost'

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });

    test('Renders correctly with loggedin user', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <BrowserRouter>
                <Navbar user={someUser} />
            </BrowserRouter>
            ,
            container
        );

        const links = document.querySelectorAll('a');
        expect(links[0].href).toBe(BASELINK +'/');
        expect(links[1].href).toBe(BASELINK +'/profile');
        expect(links[2].href).toBe(BASELINK +'/spaces');
        expect(links[3].href).toBe(BASELINK +'/logout');
    });

    test('Renders correctly without loggedin user', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <BrowserRouter>
                <Navbar user={undefined} />
            </BrowserRouter>
            ,
            container
        );

        const links = document.querySelectorAll('a');
        expect(links[0].href).toBe(BASELINK +'/');
        expect(links[1].href).toBe(BASELINK +'/profile');
        expect(links[2].href).toBe(BASELINK +'/spaces');
        expect(links[3].href).toBe(BASELINK +'/login');
    });

});