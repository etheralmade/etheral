import { Cart, Props } from './cart';
import { connect } from 'react-redux';
import { State as ReduxState } from 'state/createStore';
import { IState as ICartState } from 'state/reducers/cart-reducer';

const mapStateToProps = (state: ReduxState) => ({
    cart: state.cartReducer.cart,
});

export default connect<ICartState, {}, Props, ReduxState>(mapStateToProps)(
    Cart
);
