import { Button } from '@material-ui/core'
import React from 'react'
import { useStateValue } from '../StateProvider';
import './Product.css'

function Product({id, title, rating, price, image}) {
    const [{}, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                rating: rating,
                price: price,
                image: image,
            }
        })
    }
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating).fill().map(() => (
                            <p>⭐</p>
                        ))
                    }
                </div>
            </div>
            <img src={image} />
            <Button className="product__btn" onClick={addToBasket}>Add to Basket</Button>
        </div>
    )
}

export default Product
