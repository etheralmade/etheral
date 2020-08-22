import React from 'react';
import { useFirestore } from 'reactfire';
import { useDispatch } from 'react-redux';

import { fetchProducts, storeProducts } from 'state/actions/products';

// Mock component to simulate how the data is being fetched from firebase (data is provided by flamelink and needed special
// query)
const Clicker = () => {
    const db = useFirestore();
    const dispatch = useDispatch();

    const fetchDatas = async () => {
        await dispatch(fetchProducts());

        try {
            const req = await db
                .collection('fl_content')
                .where('_fl_meta_.schema', '==', 'product')
                .get();
            const rsp = await req.docs.map(doc => doc.data());

            console.log(
                '%c Here re your datas',
                'color: #f2a1a9; font-weight: bold;'
            );
            console.log(rsp);

            await dispatch(storeProducts(rsp));
        } catch (err) {
            console.log('something went wrong');
            console.log(err);
        }
    };

    return <button onClick={fetchDatas}>Fetch Datas</button>;
};

export default Clicker;
