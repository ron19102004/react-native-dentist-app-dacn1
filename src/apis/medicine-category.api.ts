import axios from "axios";
import { medicineCategoryApi } from "../constants/api.constant";
import { ApiResponse, MedicineCategory } from "./model.d";

/**
 * const formData = new FormData();
 * const name = document.getElementById("name").value;
 * const description = document.getElementById("description").value;
 * const image = document.getElementById("image").files[0];
 * <p>
 * if (!name || !description || !image) {
 * alert("Vui lòng nhập đầy đủ thông tin!");
 * return;
 * }
 * const metadata = JSON.stringify({ name: name, description: description });
 * <p>
 * formData.append("image", image);
 * formData.append("metadata", new Blob([metadata], { type: "application/json" }));
 * <p>
 * // Gửi request với fetch API
 * fetch("http://localhost:8080/api/medicine-categories/new", {
 * method: "POST",
 * body: formData
 * })
 * .then(response => response.text())
 * .then(data => {
 * document.getElementById("response").innerText = data;
 * })
 * .catch(error => {
 * console.error("Lỗi:", error);
 * document.getElementById("response").innerText = "Lỗi khi upload!";
 * });
 */

export interface CreateMedicineCategoryRequest {
  name: string;
  description: string;
  image: File | null;
}
/**
 * Role: DENTIST, STAFF
 */
const createMedicineCategory = async (
  data: CreateMedicineCategoryRequest,
  token: string
): Promise<ApiResponse<MedicineCategory>> => {
  const formData = new FormData();
  if (!data.image) {
    throw new Error("Image is required");
  }
  formData.append("image", data.image);

  const metadata = JSON.stringify({
    name: data.image,
    description: data.image,
  });
  formData.append(
    "metadata",
    new Blob([metadata], { type: "application/json" })
  );
  const response = await axios.post<ApiResponse<MedicineCategory>>(
    medicineCategoryApi("/new"),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
/**
 * Role: DENTIST, STAFF
 */
export interface UpdateMedicineCategoryRequest extends CreateMedicineCategoryRequest {
  id: number;
}
const updateMedicineCategory = async (
  data: UpdateMedicineCategoryRequest,
  token: string
): Promise<ApiResponse<MedicineCategory>> => {
  const formData = new FormData();
  if (data.image) {
    formData.append("image", data.image);
  }

  const metadata = JSON.stringify({
    name: data.image,
    description: data.image,
  });
  formData.append(
    "metadata",
    new Blob([metadata], { type: "application/json" })
  );
  const response = await axios.post<ApiResponse<MedicineCategory>>(
    medicineCategoryApi("/update/" + data.id),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
/**
 * Role: DENTIST, STAFF
 */
const getAllMedicineCategory = async (
  token: string
): Promise<ApiResponse<Array<MedicineCategory>>> => {
  const response = await axios.get<ApiResponse<Array<MedicineCategory>>>(
    medicineCategoryApi("/all"),
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
/**
 * Role: DENTIST, STAFF
 */
const getDetailsMedicineCategory = async (
  id: number,
  token: string
): Promise<ApiResponse<MedicineCategory>> => {
  const response = await axios.get<ApiResponse<MedicineCategory>>(
    medicineCategoryApi("/" + id),
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
  createMedicineCategory,
  updateMedicineCategory,
  getDetailsMedicineCategory,
  getAllMedicineCategory,
};
