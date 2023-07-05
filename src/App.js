import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
    Home,
    About,
    Products,
    SingleProduct,
    Cart,
    Checkout,
    Error,
    PrivateRoute,
    AuthWrapper,
    Login,
    Register,
    ResetPassword,
    Profile,
} from "./pages";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Sidebar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/reset" element={<ResetPassword />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/products" element={<Products />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route
                        exact
                        path="/products/:id"
                        // children={<SingleProduct />}
                        element={<SingleProduct />}
                    />
                    {/* <PrivateRoute
                            exact
                            path="/checkout"
                            element={<Checkout />}
                        /> */}
                    <Route exact path="*" element={<Error />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
