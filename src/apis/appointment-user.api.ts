import axios from "axios";
import {
  ApiResponse,
  AppointmentStatus,
  DataNone,
  Dentist,
  DentistResponse,
  Expertise,
  TreatmentRecord,
  User,
} from "./model.d";
import { appointmentUserApi } from "../constants/api.constant";

export interface CreateAppointmentRequest {
  notes: string;
  dentistId: number;
  time: string; // định dạng ISO hoặc yyyy-MM-dd
}
export interface CreateAppointmentResponse {
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  id: number;
  date: string; // yyyy-MM-dd
  appointmentStatus: AppointmentStatus;
  notes: string;
  user: User;
  expertise: Expertise;
  dentist: Dentist;
}

const createAppointment = async (
  token: string,
  data: CreateAppointmentRequest
): Promise<ApiResponse<CreateAppointmentResponse>> => {
  const response = await axios.post(appointmentUserApi("/booking/new"), data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export interface GetAppointmentResponse {
  id: number;
  date: string;
  appointmentStatus: AppointmentStatus;
  notes: string;
  dentist: DentistResponse;
}
export interface GetAppointmentOptions {
  page: number;
  size: number;
}

const getAppointments = async (
  token: string,
  options: GetAppointmentOptions
): Promise<ApiResponse<GetAppointmentResponse[]>> => {
  const respone = await axios.get(
    appointmentUserApi(`?page=${options.page}&size=${options.size}`),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respone.data;
};
export interface GetAppointmentDetails extends GetAppointmentResponse {
  treatmentRecord?: TreatmentRecord;
}
const getAppointmentItem = async (
  token: string,
  id: number
): Promise<ApiResponse<GetAppointmentDetails>> => {
  const response = await axios.get(appointmentUserApi(`/item/${id}`), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const cancelAppointment = async (
  token: string,
  appointmentId: number,
  note: string
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    appointmentUserApi(`/cancel/${appointmentId}`),
    {
      note: note,
    },
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
  createAppointment,
  getAppointments,
  getAppointmentItem,
  cancelAppointment
};
