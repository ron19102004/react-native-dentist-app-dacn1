import axios from "axios";
import { ApiResponse, DentalService } from "./model.d";
import { dentalServiceApi } from "../constants/api.constant";
import StringBuilder from "../utils/string.utils";


export interface CreateDentalServiceRequest {
  name: string;
  description: string;
  price: number;
}

const createDentalSerive = async (
  token: string,
  data: CreateDentalServiceRequest
): Promise<ApiResponse<DentalService>> => {
  const response = await axios.post<ApiResponse<DentalService>>(
    dentalServiceApi("/new"),
    data,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getDentalServices = async (
  page?: number,
  size?: number
): Promise<ApiResponse<Array<DentalService>>> => {
  const response = await axios.get<ApiResponse<Array<DentalService>>>(
    dentalServiceApi(`?page=${page ?? 1}&size=${size ?? 10}`),
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
export interface GetDetailsDentalServiceOptions {
  id?: number;
  slug?: string;
}
const getDentalServiceDetails = async (
  data: GetDetailsDentalServiceOptions
): Promise<ApiResponse<DentalService>> => {
  const stringBuider = StringBuilder.builder();
  stringBuider.add("/item?");
  if (data.id) {
    stringBuider.add("id=").add(`${data.id}`);
  }
  if (data.slug) {
    stringBuider.add("slug=").add(`${data.slug}`);
  }
  const response = await axios.get<ApiResponse<DentalService>>(
    dentalServiceApi(stringBuider.build()),
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
export interface UpdateDentalServiceRequest {
  name: string;
  description: string;
  price: number;
  discount: number;
}
const updateDentalService = async (
  id: number,
  data: UpdateDentalServiceRequest,
  token: string
): Promise<ApiResponse<DentalService>> => {
  const response = await axios.put<ApiResponse<DentalService>>(
    dentalServiceApi("/update/" + id),
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default {
  createDentalSerive,
  getDentalServices,
  getDentalServiceDetails,
  updateDentalService,
};
