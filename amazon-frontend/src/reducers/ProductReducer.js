import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS,PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL, PRODUCT_RECOMMENDATIONS_REQUEST, PRODUCT_RECOMMENDATIONS_SUCCESS, PRODUCT_RECOMMENDATIONS_FAIL } from "../constants/ProductConstants";

export const prodcutListReducer = (state = {loading: true, products: [],productListByCategory: []} ,action) => {
    switch(action.type){

        case PRODUCT_LIST_REQUEST:
            return {loading: true};

        case PRODUCT_LIST_SUCCESS:{
            let productListByCategoryTemp = [];
            for(let i=0;i<action.payload.length;i++){
                if(productListByCategoryTemp.length == 0){
                    productListByCategoryTemp.push({category:action.payload[i].category,products:[action.payload[i]]});
                }else{
                    let j=0;
                    let found = false;
                    for(j=0;j<productListByCategoryTemp.length;j++){
                        if(productListByCategoryTemp[j].category == action.payload[i].category){
                            found = true;
                            break;
                        }
                    }
        
                    if(found == true){
                        productListByCategoryTemp[j].products.push(action.payload[i]);
                    }else{
                        productListByCategoryTemp.push({category:action.payload[i].category,products:[action.payload[i]]});
                    }  
                }
            }   
            return {loading: false, products: action.payload,productListByCategory:productListByCategoryTemp};
        }
            

        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state;
    }
}

export const prodcutDetailsReducer = (state = {loading: true, product: {}} ,action) => {
    switch(action.type){

        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};

        case PRODUCT_DETAILS_SUCCESS:
            console.log(action.payload.count)
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state;
    }
}

export const productAddReducer = (state = {},action) => {
    switch(action.type){
        case PRODUCT_ADD_REQUEST:
            return {}
        case PRODUCT_ADD_SUCCESS:
            return {}
        case PRODUCT_ADD_FAIL:
            return {}
        default:
            return {}
    }
}

export const productRecommendationsReducer = (state={loading:true,productRecommendations:[{}]},action) => {
    switch(action.type){
        case PRODUCT_RECOMMENDATIONS_REQUEST:
            return {loading:true}
        case PRODUCT_RECOMMENDATIONS_SUCCESS:
            return {
                loading:false,
                productRecommendations:action.payload
            }
        case PRODUCT_RECOMMENDATIONS_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}