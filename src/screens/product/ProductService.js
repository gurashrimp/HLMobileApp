import axiosInstance from "../../utils/axios";
import constants from "../../utils/constants";

export const getProducts = async(sort) => {
  const response = await axiosInstance.get(constants.API_PRODUCTS_SORT + '' + sort);
  return response;
}

export const getProductById = async (id) =>{
  const response = await axiosInstance.get(`${constants.API_PRODUCTS_BY}/${id}/detail`);
  return response;
}
export const getProductSort = async(sort) => {
  const response = await axiosInstance.get(constants.API_PRODUCTS_SORT + '' + sort);
  return response;
}