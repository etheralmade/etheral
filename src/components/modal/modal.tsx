import React from 'react';
import ReactDOM from 'react-dom';

import { Box } from 'rebass';

// import styling libs
// import local components

type Props = {
    children: React.ReactNode;
    center?: boolean;
};

const Modal: React.FC<Props> = ({ children, center }) => {
    const portal =
        typeof document !== `undefined`
            ? document.getElementById('portal')
            : null;

    // TODO: which element to render within modal?
    const Element = (
        <Box
            id="modal"
            sx={{
                zIndex: 1000,
                position: 'fixed',
                top: 0,
                height: '100vh',
                width: '100vw',
                bg: 'rgba(0, 0, 0, 0.25)',
            }}
        >
            <Box
                css={`
                    position: fixed;
                    z-index: 1000;
                    ${center !== undefined &&
                        `
                        top: 50%;
                        left: 50%;

                        transform: translate(-50%, -50%);
                        `}
                `}
            >
                {children}
            </Box>
        </Box>
    );

    if (portal) {
        return ReactDOM.createPortal(Element, portal);
    } else {
        return null;
    }
};

export { Modal };
