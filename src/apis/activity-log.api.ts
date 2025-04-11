import axios from "axios";
import { activityLogApi } from "../constants/api.constant";
import { ApiResponse } from "./model.d";

export interface ActivityLog {
  id: number;
  content: string;
  time: string;
}
/**
 * Role: ALL
 */
const getActivityLogs = async (
  token: string
): Promise<ApiResponse<Array<ActivityLog>>> => {
  const response = await axios.get<ApiResponse<Array<ActivityLog>>>(
    activityLogApi(""),
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export default {
  getActivityLogs,
};
