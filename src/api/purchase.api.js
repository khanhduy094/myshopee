import http from "../utils/http";
import {purchaseStatus} from "../constants/status";

const URL = "purchases"

const purchaseApi = {
    addToCart(data){
        return http.post(`${URL}/add-to-cart`, data)
    },
    getCartPurchase(){
        return http.get(URL, {
            params: {
                status: purchaseStatus.inCart
            }
        })
    },
    getPurchase(status){
        return http.get(URL, {
            params: {
                status
            }
        })
    },
    updateCartPurchase(data){
        return http.put(`${URL}/update-purchase`, data)
    },
    deletePurchase(data){
        return http.delete(`${URL}`, data)
    },
    buyPurchase(data){
        return http.post(`${URL}/buy-products`, data)
    }
}

export default purchaseApi;