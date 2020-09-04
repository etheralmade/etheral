import React from 'react';
import { Props as InitialProps } from '.';

type Props = InitialProps & {
    db: firebase.firestore.Firestore;
};

const Homepage: React.FC<Props> = ({ homepageData, imgS, imgM, imgL, db }) => {
    console.log(homepageData);

    return (
        <>
            <h1>This is homepage!</h1>
        </>
    );
};

export { Homepage };
