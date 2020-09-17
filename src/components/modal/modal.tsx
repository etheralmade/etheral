import React from 'react';
import ReactDOM from 'react-dom';

import { Box } from 'rebass';

// import styling libs
// import local components

type Props = {
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ children }) => {
    const portal =
        typeof document !== `undefined`
            ? document.getElementById('portal')
            : null;

    // TODO: which element to render within modal?
    const Element = (
        <Box
            sx={{
                zIndex: 1000,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: 'rgba(0, 0, 0, 0.25)',
            }}
        >
            <Box
                css={`
                    position: fixed;
                    z-index: 1000;
                    top: 50%;
                    left: 50%;

                    transform: translate(-50%, -50%);
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
