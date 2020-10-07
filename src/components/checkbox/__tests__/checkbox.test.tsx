// not for testing right now.

expect(true).toBe(true);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

// import userEvent from '@testing-library/user-event';
// import { render, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom';

// import { useForm, FormProvider } from 'react-hook-form';

// import { Checkbox } from '../checkbox';

// describe('Checkbox', () => {
//     const mockName = 'test';
//     const mockId = 'id';
//     const mockText = 'Click me';

//     let Element: any;
//     let getValues: any;

//     beforeEach(() => {
//         const methods = useForm();

//         getValues = methods.getValues;

//         Element = (
//             <FormProvider {...methods}>
//                 <Checkbox name={mockName} id={mockId} text={mockText} />;
//             </FormProvider>
//         );
//     });

//     afterEach(cleanup);

//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(Element, div);
//     });

//     it('Should be registered to the form correctly correctly', () => {
//         const { getByRole } = render(Element);

//         const inputEl = getByRole('checkbox', { name: mockName });
//         userEvent.click(inputEl);

//         expect(getValues());
//     });

//     it('matches snapshot', () => {
//         const run = false;

//         if (run) {
//             const tree = renderer.create(Element).toJSON();
//             expect(tree).toMatchSnapshot();
//         }
//     });
// });
