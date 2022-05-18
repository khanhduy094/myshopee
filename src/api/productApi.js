const { default: http } = require("../utils/http")

const URL = 'products'


const productApi = {
    getProducts(config){
        return http.get(URL, config)
    },
    getProductDetail(id){
        return http.get(`${URL}/${id}`)
    }
}

export default productApi;