import React from 'react';

import useAllCities from 'helper/use-all-cities';

type Props = {};

const Form: React.FC<Props> = () => {
    const { allCities, filterByProvince, filterByStr } = useAllCities();

    console.log(allCities);

    return <></>;
};

export { Form };
