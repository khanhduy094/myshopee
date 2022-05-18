const { default: http } = require("../utils/http")

const URL = "categories"

const categoryApi = {
    getCategories(){
        return http.get(URL)
    }
}


export default categoryApi;