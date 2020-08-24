import React from 'react';
// import { useStaticQuery } from 'gatsby';
import { Link } from '@reach/router';

type Props = {};

const Navigation: React.FC<Props> = () => {
    // const collections = useStaticQuery();

    // mock links for testing purposes
    return (
        <div style={{ display: 'flex' }}>
            <Link to="/collection1">Collection1</Link>
            <Link to="/collection2">Collection2</Link>
        </div>
    );
};

export { Navigation };
