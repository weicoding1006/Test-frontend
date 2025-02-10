import request from "../request";
import { handleRequest } from "./apiHelper";

interface createProduct {
  productName: string;
  price: number;
  storeId: number;
}
export const productAPI = {
  get: () => handleRequest(request.get("api/Product")),
  post: (data: createProduct) =>
    handleRequest(request.post("api/Product", data)),
};
