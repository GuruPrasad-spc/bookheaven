import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import "./checkout.css";

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser  } = useAuth();
    const { register, handleSubmit } = useForm();
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    // Payment data request object
    const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA']
                },
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                        gateway: 'stripe',
                        gatewayMerchantId: 'your-merchant-id'
                    }
                }
            }
        ],
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: totalPrice,
            currencyCode: 'INR'
        },
        merchantInfo: {
            merchantName: 'Book Info'
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://pay.google.com/gp/p/js/pay.js";
        script.async = true;
        script.onload = onGooglePayLoaded;
        document.body.appendChild(script);
    }, []);

    function onGooglePayLoaded() {
        const client = new google.payments.api.PaymentsClient({ environment: 'TEST' });
        client.isReadyToPay(paymentDataRequest)
            .then(response => {
                if (response.result) {
                    const button = client.createButton({
                        onClick: onGooglePayButtonClicked
                    });
                    document.getElementById('gpay-button').appendChild(button);
                }
            })
            .catch(error => console.error('Error checking Google Pay availability:', error));
    }

    function onGooglePayButtonClicked() {
        const client = new google.payments.api.PaymentsClient({ environment: 'TEST' });
        client.loadPaymentData(paymentDataRequest)
            .then(paymentData => processPayment(paymentData))
            .catch(error => console.error('Error loading payment data:', error));
    }

    function processPayment(paymentData) {
        fetch('/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentData: paymentData })
        })
            .then(response => response.json())
            .then(data => {
                alert('Payment successful!');
                handleSubmitOrder();
            })
            .catch(error => {
                alert('Payment failed');
                console.error('Error processing payment:', error);
            });
    }

    const handleSubmitOrder = async () => {
        const data = {
            name: formData.name,
            email: currentUser ?.email,
            address: {
                city: formData.city,
                country: formData.country,
                state: formData.state,
                street: formData.street,
                zip: formData.zip,
            },
            items: cartItems,
            totalPrice: totalPrice,
        };

        try {
            await createOrder(data).unwrap();
            Swal.fire('Order Created!', 'Your order has been successfully placed.', 'success');
            navigate('/order-confirmation');
        } catch (err) {
            Swal.fire('Error!', 'There was an issue creating your order.', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <fieldset className="checkout-fieldset">
            <div className="checkout-container">
{/* <br></br>                <h1>Checkout</h1> */}
                <form onSubmit={handleSubmit(handleSubmitOrder)} className="checkout-form">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Name" {...register('name', { required: true })} onChange={handleInputChange} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" {...register('email', { required: true })} onChange={handleInputChange} />

                    <label htmlFor="street">Street Address:</label>
                    <input type="text" id="street" name="street" placeholder="Street Address" {...register('street', { required: true })} onChange={handleInputChange} />
<br></br>
                    <label htmlFor="city">City:</label>
    <br></br>                <input type="text" id="city" name="city" placeholder="City" {...register('city', { required: true })} onChange={handleInputChange} />

          <br></br>          <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="state" placeholder="State" {...register('state', { required: true })} onChange={handleInputChange} />
<br></br>
                    <label htmlFor="zip">Zip Code:</label>
                    <input type="text" id="zip" name="zip" placeholder="Zip Code" {...register('zip', { required: true })} onChange={handleInputChange} />

                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="country" placeholder="Country" {...register('country', { required: true })} onChange={handleInputChange} />

                    <div id="gpay-button" className="gpay-button"></div>
                    {/* <button type="submit" disabled={isLoading} className="place-order-button">Place Order</button> */}
                </form>
                {error && <p className="error-message">Error: {error.message}</p>}
                <div className="entered-details">
                    <h2>Entered Details:</h2>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {currentUser  ?.email}</p>
                    <p><strong>Address:</strong> {formData.street}, {formData.city}, {formData.state}, {formData.zip}, {formData.country}</p>
                    <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                </div>
            </div>
        </fieldset>
    );
};

export default CheckoutPage;