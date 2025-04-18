import axios from "axios";
import {
  ApiResponse,
  AppointmentStatus,
  DataNone,
  MedicineUsed,
  TreatmentRecord,
  TreatmentRecordService,
} from "./model.d";
import { appointmentDentistApi } from "../constants/api.constant";

const confirmAppointment = async (
  token: string,
  appointmentId: number
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    appointmentDentistApi(`/confirm/${appointmentId}`),
    {},
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

const cancelAppointment = async (
  token: string,
  appointmentId: number,
  note: string
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    appointmentDentistApi(`/cancel/${appointmentId}`),
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
export interface AddDentalServiceToAppointmentData {
  note: string;
  id: number;
}
const addDentalServiceAppointment = async (
  token: string,
  appointmentId: number,
  dentalServices: AddDentalServiceToAppointmentData[]
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    appointmentDentistApi(`/add/service/${appointmentId}`),
    {
      dentalServices: dentalServices,
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
export interface AddMedicineToAppointmentData {
  guide: string;
  id: number;
  quantity: number;
}
const addMedicineAppointment = async (
  token: string,
  appointmentId: number,
  medicines: AddMedicineToAppointmentData[]
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    appointmentDentistApi(`/add/medicine/${appointmentId}`),
    {
      medicines: medicines,
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

export interface AppointmentDentistResponse {
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  id: number;
  date: string; // yyyy-MM-dd
  appointmentStatus: AppointmentStatus;
  notes: string;
  patientResponseDto: {
    fullName: string;
    email: string;
    phone: string;
  };
  treatmentRecord?: TreatmentRecord;
}

const getAppointmentsToday = async (
  token: string,
  userId: number
): Promise<ApiResponse<AppointmentDentistResponse[]>> => {
  const respone = await axios.get(appointmentDentistApi(`/today/${userId}`), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return respone.data;
};
const getAppointmentDetails = async (
  token: string,
  appointmentId: number
): Promise<ApiResponse<AppointmentDentistResponse>> => {
  const respone = await axios.get(
    appointmentDentistApi(`/item/${appointmentId}`),
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

const removeSerivce = async (
  token: string,
  appointmentId: number,
  dentalServiceIds: number[]
): Promise<ApiResponse<DataNone>> => {
  const respone = await axios.post(
    appointmentDentistApi(`/remove/service/${appointmentId}`),
    {
      dentalServiceIds: dentalServiceIds,
    },
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
const removeMedicine = async (
  token: string,
  appointmentId: number,
  medicines: number[]
): Promise<ApiResponse<DataNone>> => {
  const respone = await axios.post(
    appointmentDentistApi(`/remove/medicine/${appointmentId}`),
    {
      medicines: medicines,
    },
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

const getTreatmentRecordServices = async (
  appointmentId: number,
  token: string
): Promise<ApiResponse<Array<TreatmentRecordService>>> => {
  const respone = await axios.get(
    appointmentDentistApi(`/treatment-record-services/${appointmentId}`),
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
const getMedicineUsed = async (
  appointmentId: number,
  token: string
): Promise<ApiResponse<Array<MedicineUsed>>> => {
  const respone = await axios.get(
    appointmentDentistApi(`/medicine-used/${appointmentId}`),
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
export interface UpdateTreatmentRecordRequest {
  treatment: string;
  diagnosis: string;
}
const updateTreatmentRecord = async (
  token: string,
  appointmentId: number,
  data: UpdateTreatmentRecordRequest
): Promise<ApiResponse<DataNone>> => {
  const respone = await axios.put(
    appointmentDentistApi(`/treatment-record/update/${appointmentId}`),
    data,
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
const finishAppointment = async (
  token: string,
  appointmentId: number,
): Promise<ApiResponse<DataNone>> => {
  const respone = await axios.post(
    appointmentDentistApi(`/finish/${appointmentId}`),
    {},
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

export default {
  getTreatmentRecordServices,
  getMedicineUsed,
  confirmAppointment,
  cancelAppointment,
  addDentalServiceAppointment,
  addMedicineAppointment,
  getAppointmentsToday,
  removeSerivce,
  removeMedicine,
  getAppointmentDetails,
  updateTreatmentRecord,
  finishAppointment
};
