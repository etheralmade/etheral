import React, { useEffect, useState } from 'react';
import { PageProps, graphql } from 'gatsby';
import { connect } from 'react-redux';

import { set } from 'lodash';
import firebase from 'gatsby-plugin-firebase';

import { Product } from 'helper/schema/product';
import Products from './products';
import { Layout } from 'components/layout';
import { State as ReduxState } from 'state/createStore';
import { IState as ICartState } from 'state/reducers/cart-reducer';
/**
 * Product page templating.
 *
 * - Source images
 * - Source datas from graphql
 * - Source product amount from db (actual)
 * - Source (remaining) allowed product order amount
 *
 * @param props
 */
const ProductsTemplate: React.FC<PageProps & ICartState> = props => {
    const { data, cart } = props;

    const [db, setDb] = useState<firebase.firestore.Firestore | null>(null);

    // amount of the product(s) noted on the database.
    const [actualAmount, setActualAmount] = useState(0);
    const [cartAmount, setCartAmount] = useState(0);

    // initialize db instance
    useEffect(() => {
        setDb(firebase.firestore());
    }, []);

    // fetch actual amount from db
    useEffect(() => {
        if (db) {
            fetchAmount();
        }
    }, [db]);

    useEffect(() => {
        if (db) {
            updateCart();
        }
    }, [cart, db]);

    const productData: Product = (data as any).product as Product;

    // extract all img queries.
    const imgS = (data as any).imgS.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgM = (data as any).imgM.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgL = (data as any).imgL.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgXL = (data as any).imgXL.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgs = imgS.map((fluid: any, i) => {
        return {
            sources: [
                { ...fluid, media: '(max-width: 400px)' },
                { ...imgM[i], media: '(max-width: 768px)' },
                { ...imgL[i], media: '(max-width: 1024px)' },
                imgXL[i],
            ],
        };
    });

    set(productData, 'productImages', imgs);

    if (!db) {
        return null;
    }

    /**
     * fetch the actual amount of a product from the database.
     *
     * => realtime-update of the product inventorial state.
     */
    const fetchAmount = async () => {
        const ref = db.collection('fl_content').doc(productData.pid);

        try {
            const req = await ref.get().then(doc => doc.data());

            if (req) {
                setActualAmount(req.amount);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * update cartAmount everytime cart state get updated.
     */
    const updateCart = () => {
        const productFiltered = cart.filter(
            item => item.product.pid === productData.pid
        );

        if (productFiltered.length > 0) {
            const inCartProduct = productFiltered[0]; // get the first index as it SHOULD be the on the first index.

            setCartAmount(inCartProduct.amount);
        }
    };

    return (
        <Layout>
            <Products
                {...productData}
                availableAmount={actualAmount - cartAmount}
            />
        </Layout>
    );
};

// connect to redux global state
const mapStateToProps = (state: ReduxState) => ({
    cart: state.cartReducer.cart,
    wishlist: state.cartReducer.wishlist,
    showCart: state.cartReducer.showCart,
});

export default connect<ICartState, {}, PageProps, ReduxState>(mapStateToProps)(
    ProductsTemplate
);

export const query = graphql`
    query($slug: String) {
        product: product(slug: { eq: $slug }) {
            amount
            availableSizes
            category
            collection
            description
            gems {
                gemSizes
                gemTypes
                withGems
            }
            name
            pid
            prices {
                ausPrice
                discountPercentage
                idrPrice
            }
            productDetails
            relatedProducts
            slug
            urls
            weight
        }
        imgS: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 280, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgM: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 320, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgL: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgXL: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 620, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`;
