/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "../components/context";




const getUsername = () => {
  if(typeof window !== 'undefined') { 
  return localStorage.getItem("username");
} };

const Layout = (props) => {
const title = "Restaurant App";
const {user,logout,setUser} = useContext(AppContext);


// *** Debugging ***
console. log("User from Contect in layout:", user)
console.log("AppContext in layout:", useContext(AppContext));



  return (
    <div suppressHydrationWarning>
      <Head>
      <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />

      </Head>
      <header suppressHydrationWarning>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <Nav suppressHydrationWarning className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/" className="navbar-brand">
               Home
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register" className="nav-link">
                Sign up
              </Link>
            )}
          </NavItem>



          <NavItem>
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null); // set user after logout to "null"
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login" className="nav-link">
                 Sign in
              </Link>
            )}
          </NavItem>




          <div suppressHydrationWarning style={{color: "white"}}>
              {getUsername()}
            </div>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
    
  );
};

export default Layout;