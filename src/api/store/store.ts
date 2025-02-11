import request from "../../request";
import { handleRequest } from "../apiHelper";

export const storeAPI = {
    get:() => handleRequest(request.get("api/Store")),
    getById:(id:number) => handleRequest(request.get(`api/Store/${id}`))
}