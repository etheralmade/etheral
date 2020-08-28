import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { City } from './schema/city';

const useAllCities = () => {
    const [allCities, setAllCities] = useState<City[]>([]);
    const data = useStaticQuery(graphql`
        query {
            allCity {
                edges {
                    node {
                        name
                        postalCode
                        provinceId
                        provinceName
                        cityId
                    }
                }
            }
        }
    `);

    const extractCityFromData = (result: any) => {
        return result.allCity.edges.map(({ node }: any) => node as City);
    };

    useEffect(() => {
        if (data) {
            setAllCities(extractCityFromData(data));
        }
    }, []);

    const filterByStr = (str: string) =>
        allCities.filter(city => city.name.indexOf(str) !== -1);

    const filterByProvince = (province: string) =>
        allCities.filter(city => city.provinceName === province);

    return { allCities, filterByStr, filterByProvince };
};

export default useAllCities;
