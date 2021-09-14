import React from 'react'
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import './SubTotal.css'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';


function SubTotal() {
    const history = useHistory();
    const [{basket, user}] = useStateValue();
    return (
        <div className="subTotal">
            <CurrencyFormat renderText={(value) =>(
                <>
                    <p>Subtotal ( {basket.length} items ) : <strong>{value}</strong></p>
                    <div className="subTotal__gift">
                        <input type="checkbox" />
                        <p>This order contains a gift</p>
                    </div>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={"$"}
            />
            <Link className="linkBtn" to={user ? '/payment' : '/login'}>
            <button>Proceed to Checkout</button>
            </Link>
        </div>
    )
}

export default SubTotal
