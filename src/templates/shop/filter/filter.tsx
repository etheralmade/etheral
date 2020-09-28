import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { startCase, snakeCase, without } from 'lodash';

import { Box, Text } from 'rebass';
import { Input, Label } from '@rebass/forms';

type Props = {};

enum SortPrice {
    LOW_TO_HIGH = 'LOW_TO_HIGH',
    HIGH_TO_LOW = 'HIGH_TO_LOW',
    NONE = 'NONE',
}

type Fields = {
    collection: string[];
    categories: string[];
};

// hard coded => change if needed?
const LIST_OF_CATEGORIES = ['BRACELET', 'RING', 'EARRINGS', 'NECKLACE'];

const Filter: React.FC<Props> = () => {
    const [sortPrice, setSortPrice] = useState<SortPrice>(SortPrice.NONE);
    const [collections, setCollections] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const submitFilter = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log({ sortPrice, collections, categories });
    };

    const data = useStaticQuery(graphql`
        query {
            collections: allCollection {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    `);

    // manual state management => can't rlly figure out how to handle radio inputs with react-hook-horm
    const handleChangeSort = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortPrice(event.target.value as SortPrice);
    };

    const handleChangeCollections = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        if (event.target && value) {
            if (event.target.checked) {
                setCollections(prev => [...prev, value]);
            } else {
                setCollections(prev => without(prev, value));
            }
        }
    };

    const handleChangeCategories = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        if (event.target && value) {
            if (event.target.checked) {
                setCategories(prev => [...prev, value]);
            } else {
                setCategories(prev => without(prev, value));
            }
        }
    };

    console.log({ sortPrice, collections, categories });

    const textStyling = {};

    return (
        <Box as="form" onSubmit={submitFilter}>
            {/* sort price filter */}
            <Box>
                <Text {...textStyling}>PRICE</Text>

                {/* controller component not compatible with radio? */}
                <Label htmlFor="price-lth">Low To High</Label>
                <Input
                    type="radio"
                    value={SortPrice.LOW_TO_HIGH}
                    id="price-lth"
                    name="priceSort"
                    onChange={handleChangeSort}
                />

                <Label htmlFor="price-htl">High To Low</Label>
                <Input
                    type="radio"
                    value={SortPrice.HIGH_TO_LOW}
                    id="price-htl"
                    name="priceSort"
                    onChange={handleChangeSort}
                />
            </Box>

            {/* collection(s) filter => render if data is available. */}
            {data && (
                <Box>
                    {data.collections.edges.map((e: any) => (
                        <React.Fragment key={e.node.name}>
                            <Label
                                htmlFor={`filter-${e.node.name.toLowerCase()}`}
                            >
                                {startCase(e.node.name)}
                            </Label>
                            <Input
                                type="checkbox"
                                value={snakeCase(e.node.name).toUpperCase()}
                                id={`filter-${e.node.name.toLowerCase()}`}
                                onChange={handleChangeCollections}
                            />
                        </React.Fragment>
                    ))}
                </Box>
            )}

            {/* category/ies filter */}
            <Box>
                {LIST_OF_CATEGORIES.map(e => (
                    <React.Fragment key={e}>
                        <Label htmlFor={`filter-${e.toLowerCase()}`}>
                            {startCase(e)}
                        </Label>
                        <Input
                            type="checkbox"
                            value={snakeCase(e).toUpperCase()}
                            id={`filter-${e.toLowerCase()}`}
                            onChange={handleChangeCategories}
                        />
                    </React.Fragment>
                ))}
            </Box>
            <Input type="submit" value="APPLY" variant="buttons.primary" />
        </Box>
    );
};

/*
 *	<Controller
                    control={control}
                    name="discountCodeInput"
                    defaultValue={initialFields.discountCodeInput}
                    rules={{
                        maxLength: 6,
                        minLength: 6,
                    }}
                    render={({ onChange, ...props }) => (
                        <Input
                            variant="variants.textInput"
                            type="text"
                            placeholder="ENTER YOUR DISCOUNT CODE HERE"
                            aria-label="Discount code input"
                            onChange={e =>
                                onChange(e.target.value.toUpperCase())
                            } // forcing uppercase input
                            {...props}
                        />
                    )}
                />
 */

export { Filter };
