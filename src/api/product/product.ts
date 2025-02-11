import request from "../../request";
import { handleRequest } from "../apiHelper";
import type { CreateProduct, editProduct} from "./product.interface";


export const productAPI = {
  get: () => handleRequest(request.get("api/Product")),
  post: (data: CreateProduct) =>
    handleRequest(request.post("api/Product", data)),
  delete: (id: number) => handleRequest(request.delete(`api/Product/${id}`)),
  put:(id:number,data:editProduct) => handleRequest(request.put(`api/Product/${id}`,data))
};
