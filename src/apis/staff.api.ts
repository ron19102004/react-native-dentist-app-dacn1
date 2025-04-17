import axios from "axios";
import { ApiResponse, DataNone, Invoice, PaymentMethod } from "./model.d";
import { staffApi } from "../constants/api.constant";

const createInvoiceAppointment = async (
  token: string,
  appointmentId: number
): Promise<ApiResponse<Invoice>> => {
  const response = await axios.post(
    staffApi(`/invoices/new/${appointmentId}`),
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

const confirmInvoiceAppointment = async (
  token: string,
  appointmentId: number,
  paymentMethod: PaymentMethod
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    staffApi(`/invoices/confirm/${appointmentId}/${paymentMethod}`),
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
export default {
  createInvoiceAppointment,
  confirmInvoiceAppointment,
};
