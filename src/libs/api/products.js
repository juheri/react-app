import axios from "axios";
import { env } from "../../config";

export const getProductDetail = async (id) => {
  return await axios({
    method: "get",
    baseURL: env.BASE_URL + "/api/products/" + id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const getProducts = async (url) => {
  return await axios({
    method: "get",
    baseURL: !url ? env.BASE_URL + "/api/products" : url,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const createProduct = async (data) => {
  return await axios({
    method: "post",
    baseURL: env.BASE_URL + "/api/products",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

export const updateProduct = async (data, id) => {
  return await axios({
    method: "put",
    baseURL: env.BASE_URL + "/api/products/" + id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  });
};

export const deleteProduct = async (id) => {
  return await axios({
    method: "delete",
    baseURL: env.BASE_URL + "/api/products/" + id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
