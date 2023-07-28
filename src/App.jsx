import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51M0PmcDQDP0cu3FilEJPuC9C124s8GHOGfXXAK6nRwB1hmYcgB0422h1mDbpcsUweqFKalk1VtEIpCAWKn2hysO300tzJKMEpu"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const body = {
      // email: "emileib.lb@gmail.com",
      // name: "Emile",
      // phoneNumber: '1234567890',
      // country: 'US',
      // state: 'CA',
      // city: 'San Francisco',
      // line1: '1234 Main St',
      // postal_code: '94111',
      paymentId:'64b5468a50465ef6dfbb8f8d',
    }
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/v1/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientSecret(data.client_secret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
