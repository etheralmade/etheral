import React from 'react';
import { useNavigate } from '@reach/router';
// import styling libs
import { Box, Heading, Button, Text, Flex } from 'rebass';
// import local components

import { Order } from 'helper/schema';
import OrderOverview from './order-overview';

/**
 * orders: Orders made by an user
 * user: now-in-session user
 * auth: firebase auth object for signing out.
 */
type Props = {
    orders: Order[];
    user: firebase.User;
    auth: firebase.auth.Auth;
};

/**
 * User page compoennt.
 *
 * Used to show order history of an user and display a button which allows user to sign out
 *
 * @param param0 props
 */
const User: React.FC<Props> = ({ orders, user, auth }) => {
    const navigate = useNavigate();

    // group product by its status if it has been deliveren and sort by its date
    const activeOrders = [...orders.filter(order => !order.delivered)].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
    );
    const completedOrders = [...orders.filter(order => order.delivered)].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
    );

    /**
     * Sign the user out and then redirect to homepage
     */
    const logOut = async () => {
        try {
            await auth.signOut();
            await navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const boxStyling = {
        py: [6],
    };

    const borderStyling = {
        borderColor: 'black.1',
        borderStyle: 'solid',
        borderWidth: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    };

    return (
        <Box className="content" px={[6, 6, 8, 9, 11]}>
            {/* displays user name and logout button */}
            <Box {...boxStyling}>
                <Heading>Hello, {user.displayName}</Heading>
                <Button onClick={logOut} mt={[4]}>
                    Log Out
                </Button>
            </Box>

            {/* display if no order is available */}
            {orders.length === 0 && (
                <Box className="no-order" {...boxStyling} sx={borderStyling}>
                    <Text textAlign="center" variant="h2" color="black.0">
                        No order history
                    </Text>
                </Box>
            )}

            {/* active orders */}
            {activeOrders.length > 0 && (
                <Box className="no-order" {...boxStyling} sx={borderStyling}>
                    <Text
                        textAlign="center"
                        variant="h2"
                        color="black.0"
                        mb={[5]}
                    >
                        Active Orders
                    </Text>
                    <Flex
                        flexWrap="wrap"
                        justifyContent="space-between"
                        px={[4]}
                    >
                        {activeOrders.map(order => (
                            <OrderOverview key={order.oid} order={order} />
                        ))}
                    </Flex>
                </Box>
            )}

            {/* completed orders */}
            {completedOrders.length > 0 && (
                <Box className="no-order" {...boxStyling} sx={borderStyling}>
                    <Text
                        textAlign="center"
                        variant="h2"
                        color="black.0"
                        mb={[5]}
                    >
                        Completed Orders
                    </Text>
                    <Flex
                        flexWrap="wrap"
                        justifyContent="space-between"
                        px={[4]}
                    >
                        {completedOrders.map(order => (
                            <OrderOverview key={order.oid} order={order} />
                        ))}
                    </Flex>
                </Box>
            )}
        </Box>
    );
};

export { User };
