import React from 'react';
import Img, { FluidObject } from 'gatsby-image';

import { Box, BoxProps, Text } from 'rebass';

import { Product } from 'helper/schema/product';
import Tile from 'components/tile';
import {
    IState as ICurrencyState,
    Currencies,
} from 'state/reducers/currency-reducer';

import './product-card.scss';

export type Props = BoxProps & {
    product: Product;
    // imgs?: {
    //     sources: FixedObject | FixedObject[];
    // }[];
    imgs?: {
        sources: FluidObject | FluidObject[];
    }[];
};

const ProductCard: React.FC<ICurrencyState & Props> = ({
    product,
    imgs,
    css,
    currency,
    ...rest
}) => {
    const {
        name,
        idrPrice,
        ausPrice,
        usdPrice,
        urls,
        discountPercentage,
    } = product;

    const discounted = discountPercentage > 0;

    if (discounted) {
        console.log(`${name} is discounted`);
    }

    console.log(discountPercentage);

    // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
    let price;

    switch (currency) {
        case Currencies.IDR:
            price = `IDR ${idrPrice}`;
            break;
        case Currencies.AUD:
            price = `AUD ${ausPrice}`;
            break;
        case Currencies.USD:
            price = `USD ${usdPrice}`;
            break;
        default:
            price = `IDR ${idrPrice}`;
            break;
    }

    if (imgs) {
        return (
            <Box {...rest}>
                <Box width="100%" mb={[3]}>
                    <Box className="product-img">
                        <Img
                            fluid={imgs[0].sources}
                            alt={name}
                            className={`product-main${
                                imgs.length > 1 ? ' hide-on-hover' : ''
                            }`}
                        />
                        {imgs.length > 1 && (
                            <Img
                                fluid={imgs[1].sources}
                                alt={`${name}-second-view`}
                                className="show-on-hover"
                            />
                        )}
                    </Box>
                </Box>

                <Text variant="productName" width="100%" my={[3, 3, 2]}>
                    {name}
                </Text>
                <Text
                    variant="productPrice"
                    width="fit-content"
                    color={discounted ? '#f55' : '#000'}
                    className={discounted ? 'discount' : ''}
                >
                    {price}
                </Text>
            </Box>
        );
    } else {
        return (
            <Box {...rest}>
                <Tile url={urls[0]} imgAlt={name} />
                <Text>{name}</Text>
                <Text>IDR {idrPrice}</Text>
            </Box>
        );
    }
};

export { ProductCard };
