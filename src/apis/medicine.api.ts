import axios from "axios";
import { ApiResponse, DataNone, Medicine, MedicineUnit } from "./model.d";
import { medicineApi } from "../constants/api.constant";
import StringBuilder from "../utils/string.utils";

export interface CreateMedicineRequest {
  pricePerUnit: number;
  name: string;
  medicineUnit: MedicineUnit; // bạn có thể sửa theo enum nếu muốn
  quantity: number;
  expiry: string; // hoặc Date nếu bạn muốn parse
  supplier: string;
  medicineCategoryId: number;
}
/*
ROLE: STAFF, DENTIST
*/
const createMedicine = async (
  data: CreateMedicineRequest,
  token: string
): Promise<ApiResponse<Medicine>> => {
  const response = await axios.post<ApiResponse<Medicine>>(
    medicineApi("/new"),
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
const importQuantityMedicine = async (
  quantity: number,
  medicineId: number,
  token: string
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post<ApiResponse<DataNone>>(
    medicineApi(`/import-quantity-medicine/${medicineId}/${quantity}`),
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

export type UpdateMedicineRequest = Omit<CreateMedicineRequest, "quantity">;
/*
ROLE: STAFF, DENTIST
*/
const updateMedicine = async (
  id: number,
  data: UpdateMedicineRequest,
  token: string
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.put<ApiResponse<DataNone>>(
    medicineApi("/" + id),
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

export interface SearchMedicineOptions {
  medicineName?: string | null;
  medicineCategoryId?: number | null;
  page?: number | 1;
}
const searchMedicines = async (
  token: string,
  options?: SearchMedicineOptions | null
): Promise<ApiResponse<Array<Medicine>>> => {
  const stringBuilder = StringBuilder.builder();
  stringBuilder.add("/search?page=");
  if (options) {
    stringBuilder.add(options.page ? `${options.page}` : "1");
    if (options.medicineName) {
      stringBuilder.add("&medicineName=").add(options.medicineName ?? "");
    }
    if (options.medicineCategoryId) {
      stringBuilder
        .add("&medicineCategoryId=")
        .add(
          options.medicineCategoryId ? `${options.medicineCategoryId}` : "1"
        );
    }
  } else {
    stringBuilder.add("1");
  }
  console.log(stringBuilder.build());
  const response = await axios.get<ApiResponse<Array<Medicine>>>(
    medicineApi(stringBuilder.build()),
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
  createMedicine,
  importQuantityMedicine,
  updateMedicine,
  searchMedicines,
};
