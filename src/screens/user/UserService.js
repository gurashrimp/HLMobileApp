import axiosInstance from "../../utils/axios";
import constants from "../../utils/constants";

export const login = async (username, password) => {
    const data = {
        username: username,
        password: password,
    }
    const res = await axiosInstance.post(constants.API_LOGIN, data);
    return res;
}

export const register = async (username, password, confirmPassword, name, email, phone, address) => {
    const data = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
        name: name,
        phone: phone,
        address: address
    }
    const res = await axiosInstance.post(constants.API_REGISTER, data);
    return res;
}

export const getUser = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}`);
    return response;
}

export const checkOut = async (id, data) => {
    const response = await axiosInstance.post(`${constants.API_USER}/${id}/cart/checkout`, data);
    return response;
}

export const getAllOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}/orders`);
    return response;
}
export const getPendingOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}/orders/pending/get`);
    return response;
}

export const getShippingOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}/orders/shipping/get`);
    return response;
}

export const getOneOrder = async (id, ido) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}/orders/${ido}`);
    return response;
}

export const cancelOrder = async (id, ido) => {
    const response = await axiosInstance.post(`${constants.API_USER}/${id}/orders/${ido}/cancel`);
    return response;
}

export const receiveOrder = async (id, ido) => {
    const response = await axiosInstance.post(`${constants.API_USER}/${id}/orders/${ido}/receive`);
    return response;
}

export const getSuccessOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}/orders/taken/get`);
    return response;
}
export const getCancelOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}/orders/cancel/get`);
    return response;
}

export const sendEmailForgotPassword = async (email) => {
    const res = await axiosInstance.post('api/sendMailForgotPassword', { email })
    return res
}

export const verifyOtp = async (data) => {
    const res = await axiosInstance.post('api/verifyOtp', data)
    return res
}

export const getUserId = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USER}/${id}`);
    return response;
}


export const changeName = async (id, name, phone, address, email) => {
    const data = {
        name: name, 
        phone:phone, 
        address:address, 
        email:email
    }
    const response = await axiosInstance.post(`${constants.API_USER}/${id}/changeName`, data);
    return response;
}

export const changePass = async (id, oldPass, newPass) => {
    const data = {
        password: oldPass,
        newPassword: newPass,
    }
    const response = await axiosInstance.post(`${constants.API_USER}/${id}/changePass`, data);
    return response;
}

