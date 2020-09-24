import { ProductInfo, Props } from './product-info';
import { connect } from 'react-redux';
import { State as ReduxState } from 'state/createStore';
import { IState as ICurrencyState } from 'state/reducers/currency-reducer';

const mapStateToProps = (state: ReduxState) => ({
    currency: state.currencyReducer.currency,
});

export default connect<ICurrencyState, Props, {}, ReduxState>(mapStateToProps)(
    ProductInfo
);
