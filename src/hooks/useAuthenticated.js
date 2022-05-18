const { useSelector } = require("react-redux");


//custom hook check trạng thái đăng nhập
export const useAuthenticated = () => {
    return useSelector(state => Boolean(state.auth.profile._id))
}

