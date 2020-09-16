/* eslint-disable @typescript-eslint/tslint/config, immutable/no-mutation */
import { useEffect } from 'react';

const useFonts = () => {
    const createLink = (): HTMLLinkElement => {
        const link = document.createElement('link');

        link.href =
            'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@1,600&display=swap';
        link.rel = 'stylesheet';

        return link;
    };

    useEffect(() => {
        const link = createLink();

        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);
};

export default useFonts;
