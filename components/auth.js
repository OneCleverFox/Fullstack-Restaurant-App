/* /lib/auth.js */

import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Registriere einen neuen Benutzer
export const registerUser = (username, email, password) => {
  // Verhindere das Ausführen der Funktion auf dem Server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        // Setze das Token, das von Strapi für die Servervalidierung zurückgegeben wird
        Cookie.set("token", res.data.jwt);

        // Löse das Versprechen auf, um das Laden auf false im SignUp-Formular zu setzen
        resolve(res);

        // Leite zurück zur Startseite für die Auswahl des Restaurants
        Router.push("/");
      })
      .catch((error) => {
        // Löse das Versprechen ab und gib das Fehlerobjekt an das Formular zurück
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  // Verhindere das Ausführen der Funktion auf dem Server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        // Setze das Token, das von Strapi für die Servervalidierung zurückgegeben wird
        Cookie.set("token", res.data.jwt);

        // Löse das Versprechen auf, um das Laden auf false im SignUp-Formular zu setzen
        resolve(res);

        // Leite zurück zur Startseite für die Auswahl des Restaurants
        Router.push("/");
      })
      .catch((error) => {
        // Löse das Versprechen ab und gib das Fehlerobjekt an das Formular zurück
        reject(error);
      });
  });
};

export const logout = () => {
  // Entferne Token- und Benutzer-Cookie
  Cookie.remove("token");
  delete window.__user;
  // Synchronisiere die Abmeldung zwischen mehreren Browserfenstern
  window.localStorage.setItem("logout", Date.now());
  // Leite zur Startseite weiter
  Router.push("/");
};

// Higher Order Component zum Umschließen unserer Seiten und zum gleichzeitigen Ausloggen in mehreren geöffneten Tabs
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
