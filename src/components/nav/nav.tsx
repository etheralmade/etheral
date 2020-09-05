import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '@reach/router';
import { debounce } from 'lodash';

import { Text, Flex, Box } from 'rebass';
import { Icon } from '@iconify/react';
import menuFill from '@iconify/icons-ri/menu-fill';
import { CSSTransition } from 'react-transition-group';

import Cart from './cart';
import { clearCart } from 'state/actions/cart';
import Dropdown from './dropdown';

import './nav.scss';

type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
};

const Navigation: React.FC<Props> = ({ auth, db }) => {
    // states for ui changes
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownL, setShowDropdownL] = useState(false);
    const [currLocation, setCurrLocation] = useState('/');

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
        setShowMenuMobile(prev => !prev);
    };

    // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
    let bg;
    if (showMenuMobile) {
        bg = 'brown.0';
    } else {
        if (showDropdownL) {
            bg = '#fff';
        } else {
            bg = 'rgba(0, 0, 0, 0)';
        }
    }

    // mock links for testing purposes
    return (
        <Flex variant="outerWrapper" as="nav" bg={bg}>
            <Box variant="innerWrapper">
                <Flex
                    width="100%"
                    height={['8vh', '8vh', '8vh', '10vh']}
                    alignItems="center"
                    css={`
                        position: relative;

                        #links-L {
                            display: none;
                        }

                        @media (min-width: 64em) {
                            #links-L {
                                display: flex;
                            }

                            #menu-mobile {
                                display: none;
                            }
                        }
                    `}
                >
                    {/* Links */}
                    <Box>
                        <Flex id="links-L" alignItems="center">
                            <Link to="/about">
                                <Text
                                    variant={
                                        currLocation.includes('about')
                                            ? 'linkActive'
                                            : 'link'
                                    }
                                    py={[0, 0, '5vh']}
                                >
                                    About
                                </Text>
                            </Link>
                            <Box
                                onMouseEnter={() => setShowDropdownL(true)}
                                onMouseLeave={() => setShowDropdownL(false)}
                            >
                                <Text variant="link" py={[0, 0, '5vh']}>
                                    Shop
                                </Text>
                                <CSSTransition
                                    in={showDropdownL}
                                    timeout={100}
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
                                    py={[0, 0, '5vh']}
                                >
                                    Blog
                                </Text>
                            </Link>
                        </Flex>
                        <Box onClick={handleMenuMobile} id="menu-mobile">
                            <Icon icon={menuFill} />
                        </Box>
                    </Box>

                    {/* Logo */}
                    <Flex width="auto" height="100%" flex="1" bg="brown" />

                    {/* Auth */}
                    <Flex>
                        {!user ? (
                            <Link to="/auth">
                                <button>Login</button>
                            </Link>
                        ) : (
                            <>
                                <button onClick={logout}>Log out</button>
                                <h3>User name: {user.displayName}</h3>
                            </>
                        )}
                        <Cart user={user} db={db} />
                    </Flex>
                </Flex>

                {/* Menu on mobile devices */}
                <CSSTransition
                    in={showMenuMobile}
                    timeout={100}
                    unmountOnExit={true}
                    classNames="links"
                >
                    <Box id="links-S" height={['92vh']} p={5}>
                        <Link to="/about">
                            <Text
                                variant={
                                    currLocation.includes('about')
                                        ? 'linkActive'
                                        : 'link'
                                }
                            >
                                About
                            </Text>
                        </Link>
                        <Box onClick={() => setShowDropdown(prev => !prev)}>
                            <Text variant="link">Shop</Text>
                        </Box>
                        <Link to="/blog">
                            <Text
                                variant={
                                    currLocation.includes('blog')
                                        ? 'linkActive'
                                        : 'link'
                                }
                            >
                                Blog
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
            </Box>
        </Flex>
    );
};

export { Navigation };
