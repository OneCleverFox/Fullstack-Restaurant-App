import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";
import AppContext from "./context";
import Link from "next/link";

function Cart() {
  // Annahme: isAuthenticated wird verwendet, um den authentifizierten Status des Benutzers zu überprüfen.
  let isAuthenticated = true;

  // Verwenden Sie useContext, um auf den Warenkorb und zugehörige Funktionen zuzugreifen.
  let { cart, addItem, removeItem } = useContext(AppContext);

  // Verwenden Sie useRouter, um auf den Router zuzugreifen.
  const router = useRouter();

  // Funktion zum Rendern der einzelnen Warenkorbartikel
  const renderItems = () => {
    let { items } = cart;

    if (items && items.length) {
      var itemList = cart.items.map((item) => {
        if (item.quantity > 0) {
          return (
            <div className="items-one" style={{ marginBottom: 15 }} key={item.id}>
              <div>
                <span id="item-price">&nbsp; ${item.attributes.price}</span>
                <span id="item-name">&nbsp; {item.attributes.name}</span>
              </div>
              <div>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 15,
                    marginRight: 5,
                    marginLeft: 10,
                  }}
                  onClick={() => addItem(item)}
                  color="link"
                >
                  +
                </Button>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 15,
                    marginRight: 10,
                  }}
                  onClick={() => removeItem(item)}
                  color="link"
                >
                  -
                </Button>
                <span style={{ marginLeft: 5 }} id="item-quantity">
                  {item.quantity}x
                </span>
              </div>
            </div>
          );
        }
      });
      return itemList;
    } else {
      return <div></div>;
    }
  };

// debuggung logs
//console.log("Cart from cart.js:", cart)
//console.log("Cart.total  from cart.js:", cart.total)
// console.log("AppContext from cart.js :", AppContext)


  // Funktion zum Anzeigen der Checkout-Elemente
  const checkoutItems = () => {
    return (
      <div>
        <Badge style={{ width: 200, padding: 10 }} color="light">
          <h5 style={{ fontWeight: 100, color: "green" }}>Total:</h5>
          <h3>${cart.total}</h3>
        </Badge>
        <Link href="/checkout/">
          <Button style={{ width: "50%" }} color="success">
            Order
          </Button>
        </Link>
      </div>
    );
  };

  // Rendern des Warenkorbs
  return (
    <div>
      <h1>Cart</h1>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>Your Order:</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>{renderItems()}</div>
          <div>{checkoutItems()}</div>
          {console.log(`Router Path: ${router.asPath}`)}
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}

export default Cart;
