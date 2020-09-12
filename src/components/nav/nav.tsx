import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '@reach/router';
import { FluidObject } from 'gatsby-image';

import { Text, Flex, Box } from 'rebass';
import { Icon } from '@iconify/react';
import menuFill from '@iconify/icons-ri/menu-fill';
import { CSSTransition } from 'react-transition-group';
import closeLine from '@iconify/icons-ri/close-line';

import Cart from './cart';
import { clearCart } from 'state/actions/cart';
import Dropdown from './dropdown';
import Logo from 'components/logo';
import CartItems from './cart-items';
import CurrencySelector from './currency-selector';
import { IState as ICartState } from 'state/reducers/cart-reducer';
import Account from './account';

import './nav.scss';

export type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
    navigationImage: FluidObject | FluidObject[];
};

const Navigation: React.FC<Props & ICartState> = ({ auth, db, cart }) => {
    // states for ui changes
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownL, setShowDropdownL] = useState(false);
    const [currLocation, setCurrLocation] = useState('/');
    const [showCart, setShowCart] = useState(false);

    const [user, setUser] = useState<firebase.User | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }
        if (window.location) {
            const { pathname } = location;
            setCurrLocation(pathname);
        }
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
            await setUser(null);
            await dispatch(clearCart());
        } catch (e) {
            console.error(e);
        }
    };

    const handleMenuMobile = () => {
        if (showDropdown) {
            setShowDropdown(false);
        }
        if (showCart) {
            setShowCart(false);
        }
        setShowMenuMobile(prev => !prev);
    };

    const toggleShowCart = () => {
        if (showMenuMobile) {
            setShowMenuMobile(false);
        }
        setShowCart(prev => !prev);
    };

    // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
    let bg;
    if (showMenuMobile) {
        bg = 'brown.0';
    } else {
        if (showDropdownL || showCart) {
            bg = '#fff';
        } else {
            bg = 'rgba(0, 0, 0, 0)';
        }
    }

    // mock links for testing purposes
    return (
        <Flex variant="outerWrapper" as="header" bg={bg}>
            <Box
                variant="innerWrapper"
                my={[0, 5, 0]}
                css={`
                    .hide-on-mobile {
                        display: none;
                    }

                    @media screen and (min-width: 48em) {
                        .hide-on-mobile {
                            display: block;
                        }

                        .hide-on-desktop {
                            display: none;
                        }
                    }

                    & .icons {
                        height: 12px;
                        width: 12px;

                        &.bigger {
                            height: 16px;
                            width: 16px;
                        }

                        @media screen and (min-width: 27em) {
                            height: 14px;
                            width: 14px;

                            &.bigger {
                                height: 18px;
                                width: 18px;
                            }
                        }

                        @media screen and (min-width: 48em) {
                            height: 24px;
                            width: 24px;

                            &.black-on-dropdown path {
                                fill: ${showDropdownL || showCart
                                    ? '#000'
                                    : '#fff'};
                            }

                            &.black-on-dropdown-stroke path {
                                stroke: ${showDropdownL || showCart
                                    ? '#000'
                                    : '#fff'};
                            }
                        }
                    }
                `}
            >
                {/* Logo */}
                <Link to="/">
                    <Flex
                        variant="center"
                        css={`
                            position: absolute;
                            z-index: 2;

                            left: 50%;
                            transform: translate(-50%, 0);

                            & svg {
                                height: 8vh;
                                width: 20vw;
                            }

                            @media screen and (min-width: 48em) {
                                width: 12vw;
                                height: 8vh;
                                transform: translate(-55%, 8px);

                                & svg path {
                                    fill: ${showDropdownL || showCart
                                        ? '#000'
                                        : '#fff'};
                                }
                            }

                            @media screen and (min-width: 64em) {
                                width: 10vw;
                                max-width: 150px;
                                transform: translate(-60%, 8px);
                            }
                        `}
                    >
                        <Logo />
                    </Flex>
                </Link>

                <Flex
                    width="100%"
                    height={['8vh', '8vh', '10vh']}
                    alignItems="center"
                    justifyContent="space-between"
                    css={`
                        position: relative;

                        #links-L {
                            display: none;
                        }

                        @media (min-width: 48em) {
                            #links-L {
                                display: flex;
                            }

                            #menu-mobile {
                                display: none;
                            }
                        }
                    `}
                >
                    {/* Links for desktop */}

                    <Flex id="links-L" alignItems="center">
                        <Link to="/about">
                            <Text
                                variant={
                                    currLocation.includes('about')
                                        ? 'linkActive'
                                        : 'link'
                                }
                                color={
                                    showDropdownL || showCart ? '#000' : '#fff'
                                }
                                py={[0, 0, '5vh']}
                            >
                                ABOUT
                            </Text>
                        </Link>
                        <Box
                            onMouseEnter={() => setShowDropdownL(true)}
                            onMouseLeave={() => setShowDropdownL(false)}
                        >
                            <Text
                                variant="link"
                                py={[0, 0, '5vh']}
                                color={
                                    showDropdownL || showCart ? '#000' : '#fff'
                                }
                            >
                                SHOP
                            </Text>
                            <CSSTransition
                                in={showDropdownL}
                                timeout={200}
                                unmountOnExit={true}
                                classNames="dropdown"
                            >
                                <Dropdown
                                    goBack={() => setShowDropdown(false)}
                                    currLocation={currLocation}
                                />
                            </CSSTransition>
                        </Box>
                        <Link to="/blog">
                            <Text
                                variant={
                                    currLocation.includes('blog')
                                        ? 'linkActive'
                                        : 'link'
                                }
                                color={
                                    showDropdownL || showCart ? '#000' : '#fff'
                                }
                                py={[0, 0, '5vh']}
                            >
                                BLOG
                            </Text>
                        </Link>
                    </Flex>

                    {/* menu toggle button for mobile */}
                    <Flex
                        variant="center"
                        onClick={handleMenuMobile}
                        id="menu-mobile"
                    >
                        <Icon
                            icon={showMenuMobile ? closeLine : menuFill}
                            className={`icons ${
                                showMenuMobile ? 'bigger' : ''
                            }`}
                        />
                    </Flex>

                    {/* Auth and cart. Always show auth component, as it is not in the menu */}
                    <Flex alignItems="center">
                        <CurrencySelector
                            showDropdown={showDropdownL || showCart}
                            desktop={true}
                        />
                        <Account desktop={true} user={user} />
                        <Cart
                            toggleShowCart={toggleShowCart}
                            showCart={showCart}
                            user={user}
                            db={db}
                            cart={cart}
                        />
                    </Flex>
                </Flex>

                {/* Menu on mobile devices */}
                <CSSTransition
                    in={showMenuMobile}
                    timeout={100}
                    unmountOnExit={true}
                    classNames="links"
                >
                    <Box id="links-S" minHeight={['92vh']} p={5}>
                        <Flex alignItems="center">
                            <Account user={user} desktop={false} />
                            <CurrencySelector
                                showDropdown={true}
                                desktop={false}
                            />
                        </Flex>
                        <Link to="/about">
                            <Text
                                variant={
                                    currLocation.includes('about')
                                        ? 'linkActive'
                                        : 'link'
                                }
                                my={[2]}
                            >
                                ABOUT
                            </Text>
                        </Link>
                        <Box onClick={() => setShowDropdown(prev => !prev)}>
                            <Text variant="link" my={[2]}>
                                SHOP
                            </Text>
                        </Box>
                        <Link to="/blog">
                            <Text
                                variant={
                                    currLocation.includes('blog')
                                        ? 'linkActive'
                                        : 'link'
                                }
                                my={[2]}
                            >
                                BLOG
                            </Text>
                        </Link>
                    </Box>
                </CSSTransition>

                {/* Dropdown element. */}
                <CSSTransition
                    in={showDropdown}
                    timeout={100}
                    unmountOnExit={true}
                    classNames="dropdown"
                >
                    <Dropdown
                        goBack={() => setShowDropdown(false)}
                        currLocation={currLocation}
                    />
                </CSSTransition>

                <CSSTransition
                    in={showCart}
                    timeout={100}
                    unmountOnExit={true}
                    classNames="cart-items"
                >
                    <CartItems cart={{ cart }} />
                </CSSTransition>
            </Box>
        </Flex>
    );
};

export { Navigation };
