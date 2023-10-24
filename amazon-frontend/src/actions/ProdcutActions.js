import axios from "../Axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_RECOMMENDATIONS_REQUEST,
    PRODUCT_RECOMMENDATIONS_FAIL,
    PRODUCT_RECOMMENDATIONS_SUCCESS
} from "../constants/ProductConstants";

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        const { data } = await axios.get("/api/products");
        const count = data.length;
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}

export const detailsProduct = (productID) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productID
    });

    try {
        const { data } = await axios.get(`/api/products/${productID}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
        dispatch({
            type: PRODUCT_RECOMMENDATIONS_REQUEST,
            payload: data.product_id
        })
        console.log(data.product_id);
        dispatch(recommendationsProduct(data.product_id));

    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.mesaage
                ? error.response.data.message
                : error.message,
        });
    }
};

export const addProduct = (product) => async (dispatch) => {
    dispatch({
        type: PRODUCT_ADD_REQUEST,
        payload: product
    })

    try {
        const result = await axios.post(`/api/products/addProduct`, product);
        console.log(result);
        dispatch({
            type: PRODUCT_ADD_SUCCESS,
            payload: "success"
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_ADD_FAIL,
            payload: error.response && error.response.data.mesaage
                ? error.response.data.message
                : error.message,
        })
    }
}

export const recommendationsProduct = (productID) => async (dispatch) => {
    dispatch({
        type: PRODUCT_RECOMMENDATIONS_REQUEST,
        payload: productID
    })

    try {
        console.log(productID)
        const { data } = await axios.get(`/api/products/getsimilar/${productID}`);
        const products = data.data;

        let ecoFriendlyProducts = [];

        products.forEach(product => {
            if ((product.greenRating === 0 || product.greenRating === 2) && (product.product_id !== productID)) {
                ecoFriendlyProducts.push(product)
            }
        });

        dispatch({
            type: PRODUCT_RECOMMENDATIONS_SUCCESS,
            payload: ecoFriendlyProducts
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_RECOMMENDATIONS_FAIL,
            payload: error.response && error.response.data.mesaage
                ? error.response.data.message
                : error.message,
        });
    }
}