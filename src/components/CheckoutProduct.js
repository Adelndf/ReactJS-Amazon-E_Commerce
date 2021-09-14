import React from 'react'
import { useStateValue } from '../StateProvider';
import './CheckoutProduct.css'

function CheckoutProduct({ id, title, price, rating, image, disRemove }) {
    const [{}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
    }

    return (
        <div className="checkoutProduct">
            <img src={image} alt="" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {
                        Array(rating).fill().map(() => (
                            <p>⭐</p>
                        ))
                    }
                </div>
                <button className={disRemove && 'disRemove'} onClick={removeFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
