import React, { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

import { Homepage as HomepageEl } from './homepage';
import { FluidData, HomePageData } from 'pages';

export type Props = {
    homepageData: HomePageData;
    imgS: FluidData;
    imgM: FluidData;
    imgL: FluidData;
};

const Homepage: React.FC<Props> = props => {
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );

    useEffect(() => {
        setDb(firebase.firestore());
    }, []);

    return db ? <HomepageEl db={db} {...props} /> : <></>;
};

export default Homepage;
