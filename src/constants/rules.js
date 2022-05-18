


import {isEmail} from "../utils/helper";

export const rules = {
    name : {
        maxLength: {
            value: 160,
            message: "Tên có độ dài tối đa là 160 ký tự"
        }
    },
    phone : {
        maxLength: {
            value: 20,
            message: "Số điện thoại có độ dài tối đa là 20"
        }
    },
    address : {
        maxLength: {
            value: 160,
            message: "Địa chỉ có độ dài tối đa là 160 ký tự"
        }
    },
    email: {
        required : {
            value: true,
            message: "Email không được để trống"
        },
        minLength: {
            value: 6,
            message: "Email dài từ 6-160 kí tự"
        },
        maxLength: {
            value: 160,
            message: "Email dài từ 6-160 kí tự"
        },
        validate: {
            email: value => isEmail(value) || "Email không đúng định dạng"
        }
    },
    password: {
        required: {
            value: true,
            message: "Password không được để trống"
        },
        minLength: {
            value: 6,
            message: "Password dài từ 6-160 kí tự"
        },
        maxLength: {
            value: 160,
            message: "Password dài từ 6-160 kí tự"
        },
    },
    confirmedPassword: {
        required: {
            value: true,
            message: "ConfirmedPassword không được để trống"
        },
        minLength: {
            value: 6,
            message: "ConfirmedPassword dài từ 6-160 kí tự"
        },
        maxLength: {
            value: 160,
            message: "ConfirmedPassword dài từ 6-160 kí tự"
        },
    },
}
