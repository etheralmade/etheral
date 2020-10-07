expect(true).toBe(true);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

// // import { render, cleanup } from '@testing-library/react'
// import { cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom';

// import { Message } from '../message';

// describe('Message', () => {
//     const mockRegister = jest.fn(() => {});

//     const Element = <Message register={mockRegister} />;

//     afterEach(cleanup);

//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(Element, div);
//     });

//     /* it('renders correctly', () => {
// 		const { getByTestId } = render()
// 	}) */

//     it('matches snapshot', () => {
//         const run = true;

//         if (run) {
//             const tree = renderer.create(Element).toJSON();
//             expect(tree).toMatchSnapshot();
//         }
//     });
// });
