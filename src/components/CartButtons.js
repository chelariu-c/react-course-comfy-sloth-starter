import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useProductsContext } from "../context/products_context";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useCartContext } from "../context/cart_context";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback } from "react";
import { logout } from "../context/auth";
import Menu from "@mui/material/Menu";

const CartButtons = () => {
    const { closeSidebar } = useProductsContext();
    const { total_items } = useCartContext();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        navigate("/profile");
        setAnchorEl(null);
    };
    return (
        <Wrapper className="cart-btn-wrapper">
            <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
                Cart
                <span className="cart-container">
                    <FaShoppingCart />
                    <span className="cart-value">{total_items}</span>
                </span>
            </Link>
            {currentUser ? (
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem
                            onClick={() =>
                                logOut({ returnTo: window.location.origin })
                            }
                        >
                            Logout <FaUserMinus />
                        </MenuItem>
                    </Menu>
                </div>
            ) : (
                <button
                    type="button"
                    className="auth-btn"
                    onClick={() => navigate("/login")}
                >
                    Login <FaUserPlus />
                </button>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 225px;

    .cart-btn {
        color: var(--clr-grey-1);
        font-size: 1.5rem;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-1);
        display: flex;

        align-items: center;
    }
    .cart-container {
        display: flex;
        align-items: center;
        position: relative;
        svg {
            height: 1.6rem;
            margin-left: 5px;
        }
    }
    .cart-value {
        position: absolute;
        top: -10px;
        right: -16px;
        background: var(--clr-primary-5);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 0.75rem;
        color: var(--clr-white);
        padding: 12px;
    }
    .auth-btn {
        display: flex;
        align-items: center;
        background: transparent;
        border-color: transparent;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--clr-grey-1);
        letter-spacing: var(--spacing);
        svg {
            margin-left: 5px;
        }
    }
`;
export default CartButtons;
