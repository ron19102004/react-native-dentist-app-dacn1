import axios from "axios";
import { ApiResponse, Expertise } from "./model.d";
import { expertiseApi } from "../constants/api.constant";

export interface CreateExpertiseRequest {
  name: string;
  description: string;
  image: File | null;
}
/**
 * Role: ADMIN
 */
const createExpertise = async (
  data: CreateExpertiseRequest,
  token: string
): Promise<ApiResponse<Expertise>> => {
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
  const response = await axios.post<ApiResponse<Expertise>>(
    expertiseApi("/new"),
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
 * Role: ADMIN
 */
export interface UpdateExpertiseRequest extends CreateExpertiseRequest {
  id: number;
}
const updateExpertise = async (
  data: UpdateExpertiseRequest,
  token: string
): Promise<ApiResponse<Expertise>> => {
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
  const response = await axios.post<ApiResponse<Expertise>>(
    expertiseApi("/update/" + data.id),
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

const getExpertiseBySlugify = async (
  slugify: string
): Promise<ApiResponse<Expertise>> => {
  const response = await axios.get<ApiResponse<Expertise>>(
    expertiseApi(`/${slugify}`),
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
const getAllExpertise = async (): Promise<ApiResponse<Array<Expertise>>> => {
  const response = await axios.get<ApiResponse<Array<Expertise>>>(
    expertiseApi(`/all`),
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export default {
  createExpertise,
  updateExpertise,
  getExpertiseBySlugify,
  getAllExpertise,
};
