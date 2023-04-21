import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import {
  products_url as url,
} from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_IMAGES_BEGIN,
  GET_SINGLE_PRODUCT_IMAGES_SUCCESS,
  GET_SINGLE_PRODUCT_IMAGES_ERROR,
  GET_PRODUCT_STOCK_BEGIN,
  GET_PRODUCT_STOCK_SUCCESS,
  GET_PRODUCT_STOCK_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  single_product_image_loading: false,
  single_product_image_error: false,
  single_product_images: [],
  product_stock_loading: false,
  product_stock_error: false,
  product_stock: {},

};
 
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
   
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
    useEffect(() => {
    fetchProducts(url);
  }, []);

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

   const fetchProductImages = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_IMAGES_BEGIN });
     try {
      const imagesProductUrl = `http://localhost:8090/images/${id}`;
      const response = await axios.get(imagesProductUrl);
      const singleProductImages = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_IMAGES_SUCCESS, payload: singleProductImages });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_IMAGES_ERROR });
    }
  };

  const fetchProductQuantity = async (id) => {
    dispatch({ type: GET_PRODUCT_STOCK_BEGIN });
     try {
      const productStockUrl = `http://localhost:8081/inventories/${id}`;
       const response = await axios.get(productStockUrl);
       console.log("response.data",response.data);
       const productStock = response.data[0];
      dispatch({ type: GET_PRODUCT_STOCK_SUCCESS, payload: productStock });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_STOCK_ERROR });
    }
  };

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct, fetchProductImages, fetchProductQuantity }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
