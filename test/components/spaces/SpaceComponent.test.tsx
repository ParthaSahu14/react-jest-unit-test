import ReactDOM from "react-dom";
import { SpaceComponent } from "../../../src/components/spaces/SpaceComponent";
import { fireEvent } from "@testing-library/react";
import React from "react";

describe('Space component test suite', () => {
    let container: HTMLDivElement;
    const reserveSpaceMock = jest.fn();

    function cleanupTest(){
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    }

    function setupTest(element: React.FunctionComponentElement<any>){
        container = document.createElement('div');
            document.body.appendChild(container);
            ReactDOM.render(element,container);
    }

    describe('test with photo URL', () => {

        beforeEach(() => {
            setupTest(<SpaceComponent
                location={'some location'}
                name={'some name'}
                reserveSpace={reserveSpaceMock}
                spaceId={'123'}
                photoUrl={'some.url'} />);
        });

        afterEach(() => {
            cleanupTest();
        });

        test('show image correctly', () => {
            const img = document.querySelector('img');
            expect(img!).toBeInTheDocument();
            expect(img!.src).toBe('http://localhost/some.url');
        });

        test('show labels correctly', () => {
            const labels = document.querySelectorAll('label');
            expect(labels[0]).toHaveTextContent('some name');
            expect(labels[1]).toHaveTextContent('123');
            expect(labels[2]).toHaveTextContent('some location');
        });

        test('test reserve spaces', () => {
            const button = document.querySelector('button');
            fireEvent.click(button!);
            expect(reserveSpaceMock).toBeCalledWith('123');
        });

    });

    describe('test without photo URL', () => {

        beforeEach(() => {
            setupTest(<SpaceComponent
                location={'some location'}
                name={'some name'}
                reserveSpace={reserveSpaceMock}
                spaceId={'123'}
               />);
        });

        afterEach(() => {
            cleanupTest();
        });

        test('show image correctly', () => {
            const img = document.querySelector('img');
            expect(img!).toBeInTheDocument();
            expect(img!.src).toBeFalsy();
        });

    });
});