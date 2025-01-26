import axios from "./axios";
import { AxiosResponse } from "axios";

export async function AddToCard(data: any): Promise<AxiosResponse<any>> {
  return await axios.get("/order", data);
}
