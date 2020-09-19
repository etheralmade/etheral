import { connect } from 'react-redux';

import { State as ReduxState } from 'state/createStore';
import { IState as ICurrencyState } from 'state/reducers/currency-reducer';

import { CartProduct, Props } from './cart-product';

const mapStateToProps = (state: ReduxState) => ({
    currency: state.currencyReducer.currency,
});

export default connect<ICurrencyState, Props, {}, ReduxState>(mapStateToProps)(
    CartProduct
);
