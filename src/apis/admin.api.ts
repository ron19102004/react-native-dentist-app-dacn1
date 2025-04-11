import axios from "axios";
import { ApiResponse, DataNone, Role, SystemInfoData, WorkStatus } from "./model.d";
import { adminApi } from "../constants/api.constant";

/**
 * Role: NON
 */
const getSystemInfo = async (): Promise<ApiResponse<SystemInfoData>> => {
  const response = await axios.get<ApiResponse<SystemInfoData>>(
    adminApi("/system/info")
  );
  return response.data;
};
const lockUser = async (
  gmail: string,
  token: string
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    adminApi(`/lock/${gmail}`),
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

const unlockUser = async (
  gmail: string,
  token: string
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.post(
    adminApi(`/unlock/${gmail}`),
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
export interface UpdateStaffInfoRequest {
  position: string;
  workStatus: WorkStatus;
}
const updateStaffInfo = async (
  gmail: string,
  token: string,
  data: UpdateStaffInfoRequest
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.put(
    adminApi(`/role/info/update/${gmail}`),
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
export interface UpdateDentistInfoRequest {
  workStatus: WorkStatus;
  expertiseId: number;
}
const updateDentistInfo = async (
  gmail: string,
  token: string,
  data: UpdateDentistInfoRequest
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.put(
    adminApi(`/role/info/update/${gmail}`),
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
export enum RoleCanChange {
  DENTIST = "DENTIST",
  STAFF = "STAFF",
}
export interface UpdateUserRoleRequest {
  email: string;
  role: RoleCanChange;
}
/**
 * ROLE: ADMIN
 * @param token
 * @param data
 * @returns
 */
const updateRole = async (
  token: string,
  data: UpdateUserRoleRequest
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.put(adminApi("/role/update"), data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const updateSystemInfo = async (
  token: string,
  data: SystemInfoData
): Promise<ApiResponse<DataNone>> => {
  const response = await axios.put(adminApi("/system/info/update"), data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getSystemInfo,
  lockUser,
  unlockUser,
  updateStaffInfo,
  updateDentistInfo,
  updateRole,
  updateSystemInfo,
};
