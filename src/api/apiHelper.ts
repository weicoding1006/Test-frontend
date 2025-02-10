import { type AxiosResponse } from "axios";

export async function handleRequest<T>(promise:Promise<AxiosResponse<T>>):Promise<T>{
    try{
        const res = await promise
        return res.data
    }catch(error){
        console.error("錯誤",error);
        throw error
    }
}