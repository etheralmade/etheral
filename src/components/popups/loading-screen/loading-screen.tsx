import React from 'react';
import { Text, Box } from 'rebass';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Modal from 'components/modal';

const LoadingScreen = () => (
    <Modal center={true}>
        <Box sx={{ textAlign: 'center' }}>
            <Loader type="Rings" color="#000" height={100} width={100} />
            <Text mt={[4]} variant="blogTitle">
                Loading
            </Text>
        </Box>
    </Modal>
);

export { LoadingScreen };
