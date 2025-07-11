import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert("Payment Successfull. You can go back now")
    } else {
      console.log(paymentMethod);
      alert("Payment Successfull. You can go back now")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border p-4 rounded-lg">
        <CardElement className="p-2" />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Pay
      </button>
      <div className="text-sm text-gray-500 mt-4">
        Use test card number <strong>4242 4242 4242 4242</strong> with any future expiration date and any CVC for testing.
      </div>
    </form>
  );
};

export default CheckoutForm;