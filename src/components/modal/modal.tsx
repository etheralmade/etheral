import React from 'react';
import ReactDOM from 'react-dom';

import { Box } from 'rebass';

// import styling libs
// import local components

type Props = {
    closeModal: () => void;
};

const Modal: React.FC<Props> = ({ closeModal }) => {
    const portal =
        typeof document !== `undefined`
            ? document.getElementById('portal')
            : null;

    // TODO: which element to render within modal?
    const Element = (
        <Box
            css={`
                position: fixed;
                z-index: 1000;
                top: 50%;
                left: 50%;

                transform: translate(-50%, -50%);

                border: 1px solid red;
            `}
        >
            <h1>Hello, world</h1>
            <button onClick={closeModal}>Close</button>
        </Box>
    );

    if (portal) {
        return ReactDOM.createPortal(Element, portal);
    } else {
        return null;
    }
};

export { Modal };
