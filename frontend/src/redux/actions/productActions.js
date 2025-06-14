import { toast } from "react-toastify";
import axios from "axios";

// Action Types

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// Fetch All Products
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: err.message });
    toast.error("Failed to fetch products");
  }
};

// Create Product
export const addProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    toast.success("Product created successfully!");
  } catch (err) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: err.message });
    toast.error("Failed to create product");
  }
  
};

//Update product
export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, product);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
    toast.success("Product updated successfully!");
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
    toast.error("Failed to update product");
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });

  try {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    toast.success("Product deleted successfully!");
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    toast.error("Failed to delete product");
  }
};


