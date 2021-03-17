import React, { useState } from "react";
import "./PaymentForm.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setSuccessMsg(null);
      setErrorMsg(error.message);
      console.log("[error]", error);
    } else {
      setErrorMsg(null);
      setSuccessMsg(paymentMethod.id);
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {errorMsg && <p className="pt-2 text-danger">{errorMsg}</p>}
      {successMsg && (
        <div>
          <p className="pt-2 text-success">Your Payment was successful.</p>
          <p>
            Payment Id: <strong>{successMsg}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
