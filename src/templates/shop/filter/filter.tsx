import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';

import { startCase, without } from 'lodash';

import { Box, Text, Flex, Button } from 'rebass';
import { Input, Label } from '@rebass/forms';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-ri/close-fill';
import { renderName } from 'helper/render-name';
import { FilterState } from '..';

import './transition.scss';

type Props = {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    clearFilters: () => void;
};

export enum SortPrice {
    LOW_TO_HIGH = 'LOW_TO_HIGH',
    HIGH_TO_LOW = 'HIGH_TO_LOW',
    NONE = 'NONE',
}
// hard coded => change if needed?
export const LIST_OF_CATEGORIES = ['BRACELET', 'RING', 'EARRINGS', 'NECKLACE'];

const Filter: React.FC<Props> = ({ setFilters, clearFilters, filters }) => {
    const [sortPrice, setSortPrice] = useState<SortPrice>(SortPrice.NONE);
    const [collections, setCollections] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        setCollections(filters.collections);
        setCategories(filters.categories);
        setSortPrice(filters.sort);
    }, [filters]);

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

    /**
     * do the filtering on shop component's display
     * @param event not rlly used.
     */
    const submitFilter = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setFilters({ sort: sortPrice, collections, categories });
    };

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

    const clear = () => {
        setSortPrice(SortPrice.NONE);
        setCollections([]);
        setCategories([]);
        // set all inputs not to be checked

        const inputs = document.querySelectorAll('.filter-form input');
        inputs.forEach(el => {
            // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-mutation
            (el as HTMLInputElement).checked = false;
        });

        clearFilters();
    };

    const textStyling = {
        fontFamily: 'heading',
        fontWeight: 600,
        fontSize: [0, 0, 1],
        mb: [2],
    };
    const labelStyling = {
        fontFamily: 'body',
        fontWeight: 'body',
        fontSize: [0, 0, 1],
        width: ['50%'],
        mb: [4],
        '&:hover': {
            cursor: 'pointer',
        },
    };

    return (
        <>
            <Text
                role="button"
                onClick={() => setShowFilter(true)}
                fontFamily="heading"
                fontWeight="medium"
                fontSize={[1, 1, 2]}
                sx={{ '&:hover': { cursor: 'pointer' } }}
            >
                FILTER
            </Text>
            <CSSTransition
                in={showFilter}
                timeout={100}
                classNames="product-filter"
                unmountOnExit={true}
            >
                <Box
                    as="form"
                    className="filter-form"
                    onSubmit={submitFilter}
                    p={[5]}
                    bg="#fff"
                    sx={{
                        position: 'absolute',
                        right: ['5%', '5%', '2%'],
                        width: ['90%', '90%', 'fit-content'],
                        zIndex: 500,
                        borderColor: 'black.1',
                        borderStyle: 'solid',
                        borderWidth: '2px',

                        '& label': labelStyling,
                        input: {
                            display: 'none',
                            '& + label::before': {
                                content: "''",
                                height: ['10px'],
                                width: ['10px'],
                                display: 'block',
                                mr: [3],
                                borderColor: 'black.0',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderRadius: '50%',
                                position: 'relative',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                transition: '.2s',
                            },
                            '&:checked + label::before': {
                                bg: 'black.0',
                            },
                        },
                    }}
                >
                    <Box
                        role="button"
                        onClick={() => setShowFilter(false)}
                        sx={{
                            position: 'absolute',
                            right: '8px',
                            top: '8px',
                            '& svg': {
                                height: ['16px', '16px', '24px'],
                                width: ['16px', '16px', '24px'],
                            },
                        }}
                    >
                        <Icon icon={closeFill} />
                    </Box>
                    {/* sort price filter */}
                    <Box as="section">
                        <Text {...textStyling}>PRICE</Text>

                        {/* controller component not compatible with radio? */}
                        <Flex flexWrap="wrap">
                            <Input
                                type="radio"
                                value={SortPrice.LOW_TO_HIGH}
                                id="price-lth"
                                name="priceSort"
                                onChange={handleChangeSort}
                            />
                            <Label htmlFor="price-lth">Low To High</Label>

                            <Input
                                type="radio"
                                value={SortPrice.HIGH_TO_LOW}
                                id="price-htl"
                                name="priceSort"
                                onChange={handleChangeSort}
                            />
                            <Label htmlFor="price-htl">High To Low</Label>
                        </Flex>
                    </Box>

                    {/* collection(s) filter => render if data is available. */}
                    {data && (
                        <Box as="section">
                            <Text {...textStyling}>COLLECTIONS</Text>
                            <Flex flexWrap="wrap">
                                {data.collections.edges.map((e: any) => (
                                    <React.Fragment key={e.node.name}>
                                        <Input
                                            type="checkbox"
                                            value={renderName(e.node.name)}
                                            id={`filter-${e.node.name.toLowerCase()}`}
                                            onChange={handleChangeCollections}
                                        />
                                        <Label
                                            htmlFor={`filter-${e.node.name.toLowerCase()}`}
                                        >
                                            {startCase(e.node.name)}
                                        </Label>
                                    </React.Fragment>
                                ))}
                            </Flex>
                        </Box>
                    )}

                    {/* category/ies filter */}
                    <Box as="section">
                        <Text {...textStyling}>CATEGORIES</Text>
                        <Flex flexWrap="wrap">
                            {LIST_OF_CATEGORIES.map(e => (
                                <React.Fragment key={e}>
                                    <Input
                                        type="checkbox"
                                        value={renderName(e)}
                                        id={`filter-${e.toLowerCase()}`}
                                        onChange={handleChangeCategories}
                                    />
                                    <Label
                                        htmlFor={`filter-${e.toLowerCase()}`}
                                    >
                                        {startCase(e.toLowerCase())}
                                    </Label>
                                </React.Fragment>
                            ))}
                        </Flex>
                    </Box>
                    <Flex justifyContent="space-between" mt={[3]}>
                        <Button type="submit" width={['48%']}>
                            APPLY
                        </Button>
                        <Button
                            onClick={clear}
                            variant="secondary"
                            width={['48%']}
                        >
                            CLEAR ALL
                        </Button>
                    </Flex>
                </Box>
            </CSSTransition>
        </>
    );
};

export { Filter };
