import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

function CardSection(props) {
  // Funktion zum Auslösen einer Bestätigung der Bestellung und Anzeige einer Erfolgsmeldung
  function orderAlert() {
    props.submitOrder();
    alert("Order Successful!");
  }

  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div className="order-button-wrapper">
                <button onClick={orderAlert}>Confirm order</button>
              </div>
              {/* Anzeige der Stripe-Fehlermeldung, falls vorhanden */}
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {`
          // Stildefinitionen für die Komponente
          .order-button-wrapper {
            display: flex;
            width: 100%;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}
      </style>
    </div>
  );
}

export default CardSection;
