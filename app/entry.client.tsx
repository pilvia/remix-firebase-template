

import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

/*

Fetch interceptor
=================

If you are using Firebase Auth, uncomment this to provide IdToken as Authentication header to server 

import { auth } from "./firebase";
const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
    let [resource, config ] = args;
    // get firebase idtoken
    const token = await auth.currentUser?.getIdToken()
    const newConfig = {
         headers: {
        Authorization: "Bearer " + token
    },
    ...config
    }
    
    const response = await originalFetch(resource, newConfig);
    return response;
};
*/


hydrateRoot(document, <RemixBrowser />);
