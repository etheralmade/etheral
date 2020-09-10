import { ProductCard, Props } from './product-card';
import { connect } from 'react-redux';

import { State as ReduxState } from 'state/createStore';
import { IState as ICurrencyState } from 'state/reducers/currency-reducer';

const mapStateToProps = (state: ReduxState) => ({
    currency: state.currencyReducer.currency,
});

export { Props };

export default connect<ICurrencyState, Props, {}, ReduxState>(mapStateToProps)(
    ProductCard
);
