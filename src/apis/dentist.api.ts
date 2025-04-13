import axios from "axios";
import { dentistApi } from "../constants/api.constant";
import { ApiResponse, Expertise, WorkStatus } from "./model.d";

export interface DentistResponse {
  expertise: Expertise;
  fullName: string;
  email: string;
  phone: string;
  dateStart: string;
  workStatus: WorkStatus;
}
/**
 * Role: NON
 */
const getDentists = async (
  page?: number | null,
  size?: number | null
): Promise<ApiResponse<Array<DentistResponse>>> => {
  const response = await axios.get<ApiResponse<Array<DentistResponse>>>(
    dentistApi(`?page=${page ?? 1}&size=${size ?? 10}`),
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export default {
  getDentists,
};
