import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from '@reach/router';

import { Text, Flex, Box } from 'rebass';
import { Icon, InlineIcon } from '@iconify/react';
import menuFill from '@iconify/icons-ri/menu-fill';
import { CSSTransition } from 'react-transition-group';
import closeLine from '@iconify/icons-ri/close-line';
import arrowDownSLine from '@iconify/icons-ri/arrow-down-s-line';

import Cart from './cart';
// import { clearCart } from 'state/actions/cart';
import Dropdown from './dropdown';
import Logo from 'components/logo';
import CartItems from './cart-items';
import CurrencySelector from './currency-selector';
import { IState as ICartState } from 'state/reducers/cart-reducer';
import Account from './account';
import Banner from './banner';
import Modal from '../modal';
import MailingList from '../popups/mailing-list';

import './styles.scss';
import './transition.scss';

export type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
    addBanner: boolean;
};

const Navigation: React.FC<Props & ICartState> = ({
    auth,
    db,
    cart,
    wishlist,
    addBanner,
}) => {
    // states for ui changes
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownL, setShowDropdownL] = useState(false);
    const [currLocation, setCurrLocation] = useState('/');
    const [showCart, setShowCart] = useState(false);

    const [user, setUser] = useState<firebase.User | null>(null);
    // const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    // set to true to show modal on homepage.
    const runModal = true;

    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }
        if (window.location) {
            const { pathname } = location;
            setCurrLocation(pathname);

            // set cookie if user visited => not same as cart component.
            // cart uses session storage nav component uses cookie to prevent doubling
            if (runModal) {
                // const visited = document.cookie;

                if (pathname === '/' && !auth.currentUser) {
                    setOpenModal(true);
                    // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-mutation
                    document.cookie = 'visited';
                }
            }
        }
    }, []);

    useEffect(() => {
        const modal = document.getElementById('modal');

        if (showMenuMobile) {
            modal?.addEventListener(
                'click',
                e => {
                    const { target } = e;

                    // close mobile menu on clicking any element other than the menu
                    if (target && (target as any).id === 'modal') {
                        setShowMenuMobile(false);
                    }
                },
                true
            );
        }
    }, [showMenuMobile]);

    const handleMenuMobile = () => {
        setShowMenuMobile(prev => !prev);
    };

    const toggleShowCart = () => {
        if (showMenuMobile) {
            setShowMenuMobile(false);
        }
        setShowCart(prev => !prev);
    };

    const bg = showDropdownL || showCart ? '#fff' : 'transparent';

    const shouldRenderBanner = addBanner;

    // mock links for testing purposes
    return (
        <Box as="header">
            {openModal && (
                <Modal center={true}>
                    <MailingList closeModal={() => setOpenModal(false)} />
                </Modal>
            )}
            {shouldRenderBanner && <Banner />}
            <Flex
                variant="outerWrapper"
                bg={bg}
                className={shouldRenderBanner ? 'with-banner' : ''}
                css={`
                    margin: 0 !important;

                    @media screen and (min-width: 48em) and (max-width: 63em) and (orientation: landscape) {
                        padding-top: 16px;
                    }
                `}
            >
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

                            &.black-on-dropdown path {
                                fill: ${showDropdownL ||
                                showMenuMobile ||
                                showCart ||
                                currLocation !== '/'
                                    ? '#000'
                                    : '#fff'};
                            }

                            &.black-on-dropdown-stroke path {
                                stroke: ${showDropdownL ||
                                showMenuMobile ||
                                showCart ||
                                currLocation !== '/'
                                    ? '#000'
                                    : '#fff'};
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
                                height: 18px;
                                width: 18px;
                            }
                        }

                        .cart-badge {
                            color: ${showDropdownL ||
                            showCart ||
                            currLocation !== '/'
                                ? '#000'
                                : '#fff'} !important;
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

                                & svg path {
                                    fill: ${showDropdownL ||
                                    showCart ||
                                    showMenuMobile ||
                                    currLocation !== '/'
                                        ? '#000'
                                        : '#fff'};
                                }

                                @media screen and (min-width: 48em) {
                                    width: 12vw;
                                    height: 8vh;
                                    transform: translate(-55%, 8px);
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
                                        showDropdownL ||
                                        showCart ||
                                        showMenuMobile ||
                                        currLocation !== '/'
                                            ? '#000'
                                            : '#fff'
                                    }
                                    py={[0, 0, '5vh']}
                                    width={[
                                        'fit-content',
                                        'fit-content',
                                        '60px',
                                    ]}
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
                                        showDropdownL ||
                                        showCart ||
                                        showMenuMobile ||
                                        currLocation !== '/'
                                            ? '#000'
                                            : '#fff'
                                    }
                                    width={[
                                        'fit-content',
                                        'fit-content',
                                        '60px',
                                    ]}
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
                            <Link to="/blogs">
                                <Text
                                    variant={
                                        currLocation.includes('blog')
                                            ? 'linkActive'
                                            : 'link'
                                    }
                                    color={
                                        showDropdownL ||
                                        showCart ||
                                        showMenuMobile ||
                                        currLocation !== '/'
                                            ? '#000'
                                            : '#fff'
                                    }
                                    py={[0, 0, '5vh']}
                                    width={[
                                        'fit-content',
                                        'fit-content',
                                        '60px',
                                    ]}
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
                                color={
                                    showMenuMobile ||
                                    showCart ||
                                    currLocation !== '/'
                                        ? '#000'
                                        : '#fff'
                                }
                            />
                        </Flex>

                        {/* Auth and cart. Always show auth component, as it is not in the menu */}
                        <Flex alignItems="center">
                            <CurrencySelector
                                showDropdown={showDropdownL || showCart}
                                desktop={true}
                                currLocation={currLocation}
                            />
                            <Account desktop={true} user={user} />
                            <Cart
                                toggleShowCart={toggleShowCart}
                                showCart={showCart}
                                user={user}
                                db={db}
                                cart={cart}
                                wishlist={wishlist}
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
                        <Modal>
                            <Box
                                id="links-S"
                                bg="#fff"
                                px={[7]}
                                py={[7]}
                                sx={{
                                    height: '100vh',
                                    top: 0,
                                    transition: '0.2s',
                                    a: {
                                        textDecoration: 'none',
                                    },
                                }}
                            >
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
                                <Box>
                                    <Text
                                        variant="link"
                                        my={[2]}
                                        onClick={() =>
                                            setShowDropdown(prev => !prev)
                                        }
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            svg: {
                                                transition: '0.2s',
                                                tansform: showDropdown
                                                    ? 'rotate(180deg) !important'
                                                    : '',
                                            },
                                        }}
                                    >
                                        SHOP
                                        <InlineIcon icon={arrowDownSLine} />
                                    </Text>
                                    <CSSTransition
                                        in={showDropdown}
                                        timeout={100}
                                        unmountOnExit={true}
                                        classNames="dropdown"
                                    >
                                        <Dropdown
                                            goBack={() =>
                                                setShowDropdown(false)
                                            }
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
                                        my={[2]}
                                    >
                                        BLOG
                                    </Text>
                                </Link>
                                <Link to="/contact">
                                    <Text
                                        variant={
                                            currLocation.includes('contact')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        CONTACT
                                    </Text>
                                </Link>

                                <Link to="/">
                                    <Text
                                        variant={
                                            currLocation.includes('faq')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        FAQ
                                    </Text>
                                </Link>

                                <Link to="/size-guide">
                                    <Text
                                        variant={
                                            currLocation.includes('size-guide')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        SIZE GUIDE
                                    </Text>
                                </Link>

                                <Box m="auto" />

                                <Flex
                                    alignItems="center"
                                    sx={{ position: 'absolute', bottom: [4] }}
                                >
                                    <Account user={user} desktop={false} />
                                    <CurrencySelector
                                        showDropdown={true}
                                        desktop={false}
                                        currLocation={currLocation}
                                    />
                                </Flex>
                            </Box>
                        </Modal>
                    </CSSTransition>

                    {/* actual box where it displays all in-cart products */}
                    <CSSTransition
                        in={showCart}
                        timeout={100}
                        unmountOnExit={true}
                        classNames="cart-items"
                    >
                        <CartItems cart={{ cart, wishlist }} />
                    </CSSTransition>
                </Box>
            </Flex>
        </Box>
    );
};

export { Navigation };
