import { useContext, useState } from "react";
import Head from "next/head";
import AppContext from "../components/context";
import Layout from "../components/layout"
import Home from "./index";



function MyApp(props){
  // Verwende useContext, um den Wert aus dem AppContext zu erhalten
  var {cart,addItem,removeItem, user, setUser} = useContext(AppContext)

  // Verwende useState, um einen lokalen Zustand zu erstellen
  const [state,setState] = useState({cart:cart});
  const { Component, pageProps } = props;
  
  // setUser-Funktion, die den Zustand "user" aktualisiert
  setUser = (user) => {
    setState({ user });
  };

  // addItem-Funktion, um Artikel zum Warenkorb hinzuzufügen
  addItem = (item) => {
    let { items } = state.cart;
    
    let foundItem = true;
    if(items.length > 0){
      foundItem = items.find((i) => i.id === item.id);

      // Wenn das Item nicht im Warenkorb ist, füge es hinzu
      if(!foundItem) foundItem = false;
    }
    else{
      foundItem = false;
    }
    console.log(`Found Item value: ${JSON.stringify(foundItem)}`)
    // wenn es nicht gefunden wurde auf 1 setzen
    if (!foundItem) {
      // setze gefunden auf 1
    
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      var newCart = {
          items: [...state.cart.items,temp],
          total: state.cart.total + item.price,
      }

      // Aktualisiere den lokalen Zustand
      setState({cart:newCart})
      console.log(`Total items: ${JSON.stringify(newCart)}`)
    } else {
      
      console.log(`Total so far:  ${state.cart.total}`)
      newCart= {
          items: items.map((item) =>{
            if(item.id === foundItem.id){
              return Object.assign({}, item, { quantity: item.quantity + 1 })
             }else{
            return item;
          }}),
          total: state.cart.total + item.price,
        }
    }
    setState({cart: newCart});  // problem is this is not updated yet
    console.log(`state reset to cart:${JSON.stringify(state)}`)
     
  };

// removeItem-Funktion, um Artikel aus dem Warenkorb zu entfernen
  removeItem = (item) => {
    let { items } = state.cart;
    //check ob es in cart ist
    const foundItem = items.find((i) => i.id === item.id);
    if (foundItem.quantity > 1) {
      var newCart = {
        items: items.map((item) =>{
        if(item.id === foundItem.id){
          return Object.assign({}, item, { quantity: item.quantity - 1 })
         }else{
        return item;
      }}),
      total: state.cart.total - item.price,
      }
      console.log(`NewCart after remove: ${JSON.stringify(newCart)}`)
    } else { 
      console.log(`Try remove item ${JSON.stringify(foundItem)}`)
      const index = items.findIndex((i) => i.id === foundItem.id);
      items.splice(index, 1);
      var newCart= { items: items, total: state.cart.total - item.price } 
    }
    setState({cart:newCart});
  }

  return (
    <AppContext.Provider value={{cart: state.cart, addItem: addItem, removeItem: removeItem,isAuthenticated:false,user:null,setUser:()=>{}}}>
      <Head>
      <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
    
      <Layout>
          <Component {...pageProps} />
      </Layout>

    </AppContext.Provider>
  );
  
}


export default MyApp;
