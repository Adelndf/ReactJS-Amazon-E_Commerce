import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import { DoubleArrowTwoTone } from '@material-ui/icons';
import { db } from '../firebase';



function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [clientSecret, setClientSecret] = useState(true);
    const history = useHistory();


    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]);

    console.log('The secret is >> ', clientSecret);

    const strip = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await strip.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent === payment Info

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            });
            history.replace('/orders')
        })
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link className='payment__link' to='/checkout'> {basket?.length} items </Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React lane</p>
                        <p>Saudi Arabia, RY</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket?.map(item => (
                            <CheckoutProduct
                                disRemove
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}

                    </div>
                </div>
                
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat renderText={(v) =>(
                                    <h3>Order Total: {v}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={"$"}
                                />
                                <button
                                    disabled={processing || disabled || succeeded}>
                                    {processing ? <p>Processing</p> : "Buy Now"}
                                    </button>
                            </div>
                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
