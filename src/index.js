import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./context/authProvider_context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthProvider>
        {/* //my implementation from backend */}
        <Auth0Provider
            domain="dev-xzlgisr8vza4qlxy.us.auth0.com"
            clientId="RpgkySQkXC393KyZSG7IvTEt4ErXnnmw"
            redirectUri={window.location.origin}
            cacheLocation="localstorage"
        >
            <UserProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </FilterProvider>
                </ProductsProvider>
            </UserProvider>
        </Auth0Provider>
    </AuthProvider>
);
