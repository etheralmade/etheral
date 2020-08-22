import React from 'react';
// import { useFirestore, useStorage } from 'reactfire';
import { useDispatch, connect } from 'react-redux';
import { set } from 'lodash';
import firebase from 'gatsby-plugin-firebase';

import 'regenerator-runtime/runtime';
import { fetchProducts, storeProducts } from 'state/actions/products';

// Mock component to simulate how the data is being fetched from firebase (data is provided by flamelink and needed special
// query)
const Clicker: React.FC<{ products: any }> = ({ products }) => {
    const db = firebase.firestore;
    const storage = firebase.storage;
    const dispatch = useDispatch();

    // Function to fetch data from the firestore AND transforming the refernce into an actual imguRl
    const fetchDatas = async () => {
        await dispatch(fetchProducts());

        try {
            const req = await db()
                .collection('fl_content')
                .where('_fl_meta_.schema', '==', 'product')
                .get();

            const rsp = await Promise.all(
                req.docs.map(async doc => {
                    const data = doc.data();
                    if (await data.image) {
                        const reqImg = await Promise.all(
                            data.image.map((ref: any) =>
                                ref.get().then((imgDoc: any) => imgDoc.data())
                            )
                        );

                        const imgDownloadUrls: any = await Promise.all(
                            reqImg.map(async (ref: any) => {
                                try {
                                    const downloadUrlReq = await storage()
                                        .ref(`flamelink/media/${ref.file}`)
                                        .getDownloadURL();

                                    return await downloadUrlReq;
                                } catch (err) {
                                    console.log(err);
                                    return '';
                                }
                            })
                        );

                        await set(data, 'productImage', imgDownloadUrls);
                    }

                    return data;
                })
            );

            await dispatch(storeProducts(rsp));
        } catch (err) {
            console.log('something went wrong');
            console.log(err);
        }
    };

    const transformImges = async () => {
        console.log(products);
    };

    return (
        <>
            <button onClick={fetchDatas}>Fetch Datas</button>
            <button onClick={transformImges}>Transform images</button>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    products: state.productReducer.data,
});

export default connect(mapStateToProps)(Clicker);
