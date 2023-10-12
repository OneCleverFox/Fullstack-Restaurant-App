/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";
import Script from "next/script";



const getUsername = () => {
  if(typeof window !== 'undefined') { 
  return localStorage.getItem("username");
} };

const Layout = (props) => {
const title = "Restaurant App";
const {user} = useContext(AppContext);
  return (
    <div suppressHydrationWarning>
      <Head>
        
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
              rel="stylesheet" 
              integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
              crossorigin="anonymous"></link>

        <script 
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
              integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
              crossorigin="anonymous"></script>

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
                    setUser(null);
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