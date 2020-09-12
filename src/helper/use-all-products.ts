import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Product } from './schema/product';

const useAllProducts = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const data = useStaticQuery(graphql`
        query {
            allProduct {
                edges {
                    node {
                        pid
                        amount
                        slug
                        category
                        collection
                        name
                        idrPrice
                        ausPrice
                        usdPrice
                        urls
                        weight
                        productImages {
                            absolutePath
                            childImageSharp {
                                fixed {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const extractProductFromData = (result: any) => {
        return result.allProduct.edges.map(({ node }: any) => node as Product);
    };

    useEffect(() => {
        if (data) {
            setAllProducts(extractProductFromData(data));
        }
    }, []);

    return allProducts;
};

export default useAllProducts;
