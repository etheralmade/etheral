import { connect } from 'react-redux';

import { CurrencySelector, Props } from './currency-selector';
import { State as ReduxState } from 'state/createStore';
import { IState as ICurrencyState } from 'state/reducers/currency-reducer';

const mapStateToProps = (state: ReduxState) => ({
    currency: state.currencyReducer.currency,
});

export default connect<ICurrencyState, Props, {}, ReduxState>(mapStateToProps)(
    CurrencySelector
);
